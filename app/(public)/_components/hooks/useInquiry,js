// hooks/useInquiry.js
import { useState } from 'react'

export const useInquiry = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const submitInquiry = async (formData) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit inquiry')
            }

            return { success: true, data }
        } catch (err) {
            setError(err.message)
            return { success: false, message: err.message }
        } finally {
            setLoading(false)
        }
    }

    return {
        submitInquiry,
        loading,
        error
    }
}