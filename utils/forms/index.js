export function isEmailValid(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

export function isPasswordValid(password) {
    // Implement your password validation logic here
    // For example, you can check if it's at least 6 characters long
    return password.length >= 6;
}