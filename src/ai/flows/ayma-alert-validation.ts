'use server';
/**
 * @fileOverview This file provides an AI-powered alert validation system for the AYMA application.
 * It defines a Genkit flow that acts as a fusion algorithm to filter out false alarms,
 * ensuring only critical and actionable alerts are presented to administrators.
 *
 * - aymaAlertValidation - The main function to trigger the alert validation process.
 * - AlertValidationInput - The input type for the aymaAlertValidation function.
 * - AlertValidationOutput - The return type for the aymaAlertValidation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlertValidationInputSchema = z.object({
  alertDescription: z.string().describe('A textual description of the alert received.'),
  sensorReadings: z.object({
    temperature: z.number().optional().describe('Current temperature reading from environmental sensors.'),
    gasLevel: z.string().optional().describe('Current gas level (e.g., "low", "medium", "high") from environmental sensors.'),
    motionDetected: z.boolean().optional().describe('Whether motion was detected by environmental sensors.'),
    soundLevel: z.number().optional().describe('Current sound level reading from environmental sensors.'),
    distance: z.number().optional().describe('Current distance reading from environmental sensors.'),
  }).optional().describe('Current readings from various environmental sensors.'),
  energyStatus: z.object({
    batteryLevel: z.number().min(0).max(100).optional().describe('Current battery level in percentage.'),
    pvInput: z.number().optional().describe('Current photovoltaic (PV) input in watts.'),
    remainingAutonomyHours: z.number().optional().describe('Estimated remaining hours until autonomy target is met.'),
  }).optional().describe('Current energy monitoring status.'),
  networkStatus: z.object({
    cellularBooster: z.string().optional().describe('Status of the cellular booster (e.g., "online", "offline", "degraded").'),
    p2pLiFi: z.string().optional().describe('Status of the P2P Li-Fi link (e.g., "online", "offline", "degraded").'),
    hfEmergencyLink: z.string().optional().describe('Status of the HF Emergency Link (e.g., "online", "offline", "degraded").'),
  }).optional().describe('Current network resilience status.'),
  historicalContext: z.string().optional().describe('Any relevant historical data or previous alert context that might help in validation.'),
});
export type AlertValidationInput = z.infer<typeof AlertValidationInputSchema>;

const AlertValidationOutputSchema = z.object({
  isValidAlert: z.boolean().describe('True if the alert is validated as critical and actionable, false if it is likely a false alarm.'),
  validationReason: z.string().describe('A detailed explanation for why the alert was validated as true or false.'),
  confidenceScore: z.number().min(0).max(1).describe('A confidence score (0-1) in the validation decision, where 1 is highly confident.'),
});
export type AlertValidationOutput = z.infer<typeof AlertValidationOutputSchema>;

export async function aymaAlertValidation(input: AlertValidationInput): Promise<AlertValidationOutput> {
  return aymaAlertValidationFlow(input);
}

const alertValidationPrompt = ai.definePrompt({
  name: 'alertValidationPrompt',
  input: { schema: AlertValidationInputSchema },
  output: { schema: AlertValidationOutputSchema },
  prompt: `You are an AI-powered fusion algorithm designed to validate and filter out false alarms for an Industrial Factory Operating System (AYMA).
Your primary goal is to identify critical and actionable alerts, aiming to filter out approximately 95% of false alarms.
Analyze the provided alert description, sensor readings, energy status, and network status.
Determine if the alert is genuinely critical and requires immediate attention, or if it is likely a false alarm based on the context.

Provide a clear explanation for your validation decision and a confidence score.

Alert Description: {{{alertDescription}}}

{{#if sensorReadings}}
Sensor Readings:
  {{#if sensorReadings.temperature}} - Temperature: {{{sensorReadings.temperature}}}°C{{/if}}
  {{#if sensorReadings.gasLevel}} - Gas Level: {{{sensorReadings.gasLevel}}}{{/if}}
  {{#if sensorReadings.motionDetected}} - Motion Detected: {{{sensorReadings.motionDetected}}}{{/if}}
  {{#if sensorReadings.soundLevel}} - Sound Level: {{{sensorReadings.soundLevel}}}{{/if}}
  {{#if sensorReadings.distance}} - Distance: {{{sensorReadings.distance}}}{{/if}}
{{/if}}

{{#if energyStatus}}
Energy Status:
  {{#if energyStatus.batteryLevel}} - Battery Level: {{{energyStatus.batteryLevel}}}%{{/if}}
  {{#if energyStatus.pvInput}} - PV Input: {{{energyStatus.pvInput}}}W{{/if}}
  {{#if energyStatus.remainingAutonomyHours}} - Remaining Autonomy Hours: {{{energyStatus.remainingAutonomyHours}}}{{/if}}
{{/if}}

{{#if networkStatus}}
Network Status:
  {{#if networkStatus.cellularBooster}} - Cellular Booster: {{{networkStatus.cellularBooster}}}{{/if}}
  {{#if networkStatus.p2pLiFi}} - P2P Li-Fi: {{{networkStatus.p2pLiFi}}}{{/if}}
  {{#if networkStatus.hfEmergencyLink}} - HF Emergency Link: {{{networkStatus.hfEmergencyLink}}}{{/if}}
{{/if}}

{{#if historicalContext}}
Historical Context: {{{historicalContext}}}
{{/if}}

Based on this information, is this a valid and critical alert that needs human intervention, or a false alarm?
Your response MUST be a JSON object conforming to the AlertValidationOutputSchema.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const aymaAlertValidationFlow = ai.defineFlow(
  {
    name: 'aymaAlertValidationFlow',
    inputSchema: AlertValidationInputSchema,
    outputSchema: AlertValidationOutputSchema,
  },
  async (input) => {
    const { output } = await alertValidationPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return output;
  }
);
