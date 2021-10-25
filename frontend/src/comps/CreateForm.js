import {useEffect, useState} from "react";
import FileBase from 'react-file-base64';

const CreatePubFrom = ({onSubmit}) => {
    const [data, setData] = useState(
        {name: '', address: '', contact: '', tags: '', statistic: '', schedule: '', avatar: []})

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.name ||
            !data.address ||
            !data.contact ||
            !data.tags ||
            !data.statistic ||
            !data.schedule ||
            !data.avatar ||
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
                data.avatar
            )
            // setName('')
            // setAddress('')
            // setContact('')
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='input-field'>
                <label htmlFor='name'>Name</label>
                <input
                    placeholder='Name'
                    type="text"
                    value={data.name}
                    onChange={({target: {value}}) => setData({...data, name: value})}
                />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input
                    placeholder='Address'
                    type="text"
                    value={data.address}
                    onChange={({target: {value}}) => setData({...data, address: value})}
                />
            </div>
            <div>
                <label htmlFor="contact">Contact</label>
                <input
                    placeholder='Contact'
                    type="text"
                    value={data.contact}
                    onChange={({target: {value}}) => setData({...data, contact: value})}
                />
            </div>
            <div>
                <label htmlFor="tags">Tags</label>
                <input
                    placeholder='Tags'
                    type="text"
                    value={data.tags}
                    onChange={({target: {value}}) => setData({...data, tags: value})}
                />
            </div>
            <div>
                <label htmlFor="statistic">Statistic</label>
                <input
                    placeholder='Statistic'
                    type="text"
                    value={data.statistic}
                    onChange={({target: {value}}) => setData({...data, statistic: value})}
                />
            </div>
            <div>
                <label htmlFor="schedule">Schedule</label>
                <input
                    placeholder='Schedule'
                    type="text"
                    value={data.schedule}
                    onChange={({target: {value}}) => setData({...data, schedule: value})}
                />
            </div>
            <div>
                <input
                    type='file'
                    value={data.avatar}
                    onChange={({target: {files}}) => setData({...data, avatar: files[0]})}
                />
            </div>
            <button
                className='btn yellow darken-4 mt'
                style={{marginRight: 10}}
                type='submit'
                disabled={!data.name || !data.address ||
                !data.contact || !data.tags ||
                !data.statistic || !data.schedule || !data.avatar || loading}
            >Add new pub
            </button>

        </form>
    )
}

export default function CreateForm() {
    const registerHandler = async (name, address, contact, tags, statistic, schedule, avatar) => {
        if (!name || !address || !contact || !tags || !statistic || !schedule || !avatar) return

        const response = await fetch('/pubs', {
            method: 'POST',
            body: JSON.stringify({name, address, contact, statistic, tags, schedule, avatar}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const data = await response.json();
        console.log(data)
    }

    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Add new pub</span>
                        <p>You can add new pub</p>
                        <CreatePubFrom onSubmit={registerHandler}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
