"use server"

type ContactRequest = {
    username: string,
    email: string,
    message: string
}

async function onContactRequest({ username, email, message }: ContactRequest) {
    console.log('Server side', { username, email, message })
}

export {
    onContactRequest
}