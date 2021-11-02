import {useState} from "react";
import {useDispatch} from "react-redux";
import {createPub} from "../actions/pubs";

const CreatePubFrom = ({onSubmit}) => {
    const dispatch = useDispatch()

    const [data, setData] = useState(
        {name: '', address: '', contact: '', tags: '', statistic: '', schedule: ''})

    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.name ||
            !data.address ||
            !data.contact ||
            !data.tags ||
            !data.statistic ||
            !data.schedule ||
            !avatar ||
            loading) return

        try {
            setLoading(true)

            await onSubmit(
                data.name,
                data.address,
                data.contact,
                data.tags,
                data.statistic,
                data.schedule,
                avatar
            )
            //     // setName('')
            //     // setAddress('')
            //     // setContact('')
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    placeholder='Name'
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={({target: {value}}) => setData({...data, name: value})}
                />
            </div>
            <div>
                <input
                    placeholder='Address'
                    name="address"
                    type="text"
                    value={data.address}
                    onChange={({target: {value}}) => setData({...data, address: value})}
                />
            </div>
            <div>
                <input
                    placeholder='Contact'
                    name="contact"
                    type="text"
                    value={data.contact}
                    onChange={({target: {value}}) => setData({...data, contact: value})}
                />
            </div>
            <div>
                <input
                    placeholder='Tags'
                    name="tags"
                    type="text"
                    value={data.tags}
                    onChange={({target: {value}}) => setData({...data, tags: value})}
                />
            </div>
            <div>
                <input
                    placeholder='Statistic'
                    name="statistic"
                    type="text"
                    value={data.statistic}
                    onChange={({target: {value}}) => setData({...data, statistic: value})}
                />
            </div>
            <div>
                <input
                    placeholder='Schedule'
                    type="text"
                    name="schedule"
                    value={data.schedule}
                    onChange={({target: {value}}) => setData({...data, schedule: value})}
                />
            </div>
            <div>
                <input
                    type='file'
                    name='avatar'
                    onChange={({target: {files}}) => setAvatar(files[0])}

                />
            </div>
            <button
                type='submit'
                className='mt-22'
                disabled={!data.name || !data.address ||
                !data.contact || !data.tags ||
                !data.statistic || !data.schedule || !avatar || loading}
                onClick={() => dispatch(createPub(data))}
            >Create
            </button>
        </form>
    )
}

export default function CreateForm() {
    const registerFormHandler = async () => {

        const formData = new FormData()
        const fileField = document.querySelector('input[type="file"]')
        const nameField = document.querySelector('input[name="name"]')
        const addressField = document.querySelector('input[name="address"]')
        const contactField = document.querySelector('input[name="contact"]')
        const statisticField = document.querySelector('input[name="statistic"]')
        const tagsField = document.querySelector('input[name="tags"]')
        const scheduleField = document.querySelector('input[name="schedule"]')

        formData.append('name', nameField.value)
        formData.append('address', addressField.value)
        formData.append('contact', contactField.value)
        formData.append('statistic', statisticField.value)
        formData.append('tags', tagsField.value)
        formData.append('schedule', scheduleField.value)
        formData.append('avatar', fileField.files[0])
        console.log(formData)

        const response = await fetch('/pubs', {
            method: 'POST',
            body: formData,

        })
        const data = await response.json();
        console.log(data)
    }

    return (
        <div className='mt-105'>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <div className='mt-50'>
                        <CreatePubFrom onSubmit={registerFormHandler}/>
                    </div>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Add new pub!</h1>
                            <p>Enter details of pub and start journey with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
