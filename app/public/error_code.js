module.exports.Error = {
  default: { code: '00-000' },
}

module.exports.AbstractError = {
  default: { code: '02-000' },
  authorization_error: { code: '02-001' },
}

module.exports.RuntimeError = {
  default: { code: '05-000' },
  username_already_exists: { code: '05-001' },
}
