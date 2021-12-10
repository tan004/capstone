import { useState } from "react"




const ReviewForm = () => {

    const [content, setContent] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

    }



    return (
        <div>
            <h2>Review Form</h2>

            <form onSubmit={handleSubmit}>

                <label htmlFor='content'>Review</label>

                <textarea
                    name='content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button>Submit</button>

            </form>
        </div>
    )
}

export default ReviewForm;
