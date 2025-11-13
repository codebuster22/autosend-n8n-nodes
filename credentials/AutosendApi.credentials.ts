import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AutosendApi implements ICredentialType {
	name = 'autosendApi';

	displayName = 'Autosend API';

	documentationUrl = 'https://docs.autosend.com/';

	icon = 'file:../icons/autosend.svg' as const;

	httpRequestNode = {
		name: 'Autosend',
		docsUrl: 'https://docs.autosend.com/',
		apiBaseUrl: 'https://api.autosend.com/',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API key from your Autosend account settings',
		},
		{
			displayName: 'From Email (for testing)',
			name: 'fromEmail',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'noreply@yourdomain.com',
			description: 'Email address to send test email from (must be verified in Autosend)',
		},
		{
			displayName: 'Test Email Recipient',
			name: 'testEmail',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'your-email@example.com',
			description: 'Email address where test email will be sent when testing credentials',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// Test by sending actual email to verify API key and account are active
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.autosend.com',
			url: '/v1/mails/send',
			method: 'POST',
			body: {
				from: {
					email: '={{$credentials.fromEmail}}',
					name: 'Autosend n8n Node',
				},
				to: {
					email: '={{$credentials.testEmail}}',
					name: 'Test User',
				},
				subject: 'Autosend Credential Test ✅',
				html: '<h1>Success!</h1><p>Your Autosend credentials are working correctly. This is a test email sent from n8n.</p>',
				text: 'Success! Your Autosend credentials are working correctly. This is a test email sent from n8n.',
			},
		},
	};
}
