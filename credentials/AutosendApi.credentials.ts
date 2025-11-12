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
	// Success: Returns 404 "Route not found" (auth worked, route doesn't exist)
	// Failure: Returns 401 "Authentication required" (invalid API key)
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.autosend.com',
			url: '/v1/',
			method: 'GET',
		},
		rules: [
			{
				type: 'responseCode',
				properties: {
					value: 404,
					message: 'API key is valid',
				},
			},
		],
	};
}
