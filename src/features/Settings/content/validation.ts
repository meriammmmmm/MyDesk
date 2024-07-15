export const listOfFilds = [
  {
    name: 'endpoint',
    pholder: 'Enter the endpoint of all users',
    label: 'Users Api',
    required: true,
  },

  { name: 'tokenName', pholder: 'Enter the token name', label: 'Token Name', required: true },
  {
    name: 'accessToken',
    pholder: 'Enter the access token',
    label: 'Access Token',
    required: true,
  },

  {
    name: 'pathOfData',
    pholder: 'ex : data.docs._id',
    label: 'Path to id',
    required: true,
  },
  {
    name: 'pathToNumberDocs',
    pholder: 'ex : data.meta.totalDocs',
    label: 'Path to TotolDocs',
    required: true,
  },
  {
    name: 'pageParams',
    pholder: 'ex : page',
    label: 'Page Params',
    required: true,
  },
  {
    name: 'pageSizeParams',
    pholder: 'ex : pageSize',
    label: 'PageSize Params',
    required: true,
  },
  {
    name: 'pathToTokenPayloadId',
    pholder: 'ex : payload.user.id',
    label: 'Path to token payload id',
    required: true,
  },
]
