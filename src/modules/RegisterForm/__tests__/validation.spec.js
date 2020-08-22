import validation from "../validation"

const errorMessages = {
    email: 'Please enter a valid email',
    firstName: 'First name must be at least 2 characters long',
    lastName: 'Last name must be at least 2 characters long',
    mobilePhone: 'Please enter a valid phone number.',
    salary: 'Salary must be a number'
}

describe('Validation rules Unit Tests', () => {
    describe('Email', () => {
        it('returns an error message if the value is invalid', () => {
            expect(validation.email('')).toBe(errorMessages.email)
            expect(validation.email('test@test')).toBe(errorMessages.email)
            expect(validation.email('test.test')).toBe(errorMessages.email)
        })
        it('returns false if the value is valid', () => {
            expect(validation.email('test@test.com')).toBe(false)
        })
    })
    describe('First name', () => {
        it('returns an error message if the value is invalid', () => {
            expect(validation.firstName('')).toBe(errorMessages.firstName)
            expect(validation.firstName('A')).toBe(errorMessages.firstName)
        })
        it('returns false if the value is valid', () => {
            expect(validation.firstName('Test')).toBe(false)
        })
    })
    describe('Last name', () => {
        it('returns an error message if the value is invalid', () => {
            expect(validation.lastName('')).toBe(errorMessages.lastName)
            expect(validation.lastName('A')).toBe(errorMessages.lastName)
        })
        it('returns false if the value is valid', () => {
            expect(validation.lastName('Test')).toBe(false)
        })
    })
    describe('Mobile phone', () => {
        it('returns an error message if the value is invalid', () => {
            expect(validation.mobilePhone('')).toBe(errorMessages.mobilePhone)
            expect(validation.mobilePhone('61234567')).toBe(errorMessages.mobilePhone)
            expect(validation.mobilePhone('112345617')).toBe(errorMessages.mobilePhone)
        })
        it('returns false if the value is valid', () => {
            expect(validation.mobilePhone('666111666')).toBe(false)
        })
    })
    describe('Day', () => {
        it('returns true if the value is invalid', () => {
            expect(validation.day('32')).toBe(true)
        })
        it('returns false if the value is valid', () => {
            expect(validation.day('31')).toBe(false)
        })
    })
    describe('Month', () => {
        it('returns true if the value is invalid', () => {
            expect(validation.month('13')).toBe(true)
        })
        it('returns false if the value is valid', () => {
            expect(validation.month('12')).toBe(false)
        })
    })
    describe('Year', () => {
        it('returns true if the value is invalid', () => {
            expect(validation.year('1000')).toBe(true)
        })
        it('returns false if the value is valid', () => {
            expect(validation.year('1991')).toBe(false)
        })
    })
    describe('Salary', () => {
        it('returns an error message if the value is invalid', () => {
            expect(validation.salary('')).toBe(errorMessages.salary)
            expect(validation.salary('AAA666')).toBe(errorMessages.salary)
        })
        it('returns false if the value is valid', () => {
            expect(validation.salary('50000')).toBe(false)
        })
    })
})
