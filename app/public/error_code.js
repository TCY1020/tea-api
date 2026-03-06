module.exports.Error = {
  default: { code: '00-000' },
}

module.exports.AbstractError = {
  default: { code: '02-000' },
  authorization_error: { code: '02-001' },
}

module.exports.AuthorizeError = {
  default: { code: '03-000' },
  invalid_token: { code: '03-001' },
}

module.exports.RuntimeError = {
  default: { code: '05-000' },
  username_already_exists: { code: '05-001' },
  user_not_found: { code: '05-002' },
  invalid_password: { code: '05-003' },
  google_id_token_required: { code: '05-004' },
  google_client_id_not_configured: { code: '05-005' },
  invalid_google_id_token: { code: '05-006' },
  google_email_not_verified: { code: '05-007' },
}

module.exports.ExternalError = {
  default: { code: '06-000' },
  token_not_found: { code: '06-001' },
}
