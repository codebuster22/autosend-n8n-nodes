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

	// Test authentication by hitting base endpoint
	// Valid key: Returns {"success":false,"error":{"message":"Route not found"}}
	// Invalid key: Returns {"success":false,"error":{"message":"Authentication required"}}
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.autosend.com',
			url: '/v1/',
			method: 'GET',
			ignoreHttpStatusErrors: true,
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'error.message',
					value: 'Route not found',
					message: 'API key is valid',
				},
			},
		],
	};
}
