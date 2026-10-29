# Store measurement contract
Event names: store_redirect and store_click. See ../data-model.md for props.
Analytics failure must not prevent native anchor navigation or location.replace. Track is attempted synchronously before replace, without delay or network acknowledgement. Redirect errors retain existing visible fallback links. Review sessionStorage guard and download per-mount guard are unchanged. Desktop/bots emit no automatic redirect.
Private route codes, destination URLs, user agents and unrelated query parameters are never custom props. Existing family_link_action remains separate and unchanged.
