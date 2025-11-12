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
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// Test by calling base endpoint - expects 404 with "Route not found"
	// This validates authentication without accessing any actual resources
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.autosend.com',
			url: '/v1/',
			method: 'GET',
		},
	};
}
