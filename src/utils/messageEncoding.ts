interface IMessageEncoding {
  body: string | null | undefined
  subject: string | null | undefined
  to: string | null | undefined
  cc: string | null | undefined
  bcc: string | null | undefined
  sender: string | null | undefined
  signature: string | null | undefined
}

const messageEncoding = ({
  body,
  subject,
  to,
  cc,
  bcc,
  sender,
  signature,
}: IMessageEncoding): string => {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject ?? '').toString(
    'base64'
  )}?=`

  const messageParts = [
    `From: ${sender}`,
    `To: ${to}`,
    `Cc: ${cc}`,
    `Bcc: ${bcc}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    `${body}`,
    `${signature && signature.length > 0 && signature}`,
  ]

  const message = messageParts.join('\n')

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  return encodedMessage
}

export default messageEncoding
