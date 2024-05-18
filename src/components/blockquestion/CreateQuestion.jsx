import { useState } from 'react';
import { set } from 'react-hook-form';

export default function Example() {
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        description: '',
        totalPoints: '',
        answerFileURL: '',
        status: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
      setIsLoading(true);
        e.preventDefault();
        fetch('http://yunom2834-001-site1.gtempurl.com/api/TeacherQuestion/CreateQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(form),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Question created:', data);
                alert('Tạo câu hỏi thành công!');
                setIsLoading(false);
            })
            .catch((error) => console.error('Error creating question:', error));
    };


    return (
        <div className="px-6 py-24 sm:py-32 lg:px-8">
            
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tạo câu hỏi</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Tạo câu hỏi cho nhiều người tham gia có thể làm.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={form.name}
                                onChange={handleChange}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                name="description"
                                id="description"
                                rows={4}
                                value={form.description}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Total Points</label>
                        <input type="number" name="totalPoints" value={form.totalPoints} onChange={handleChange}
                        className="block w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-600"
                        />
                    </div>

                {/* <div className="sm:col-span-2">
                        <label htmlFor="answerFileURL" className="block text-sm font-semibold leading-6 text-gray-900">
                            Answer File URL
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="answerFileURL"
                                id="answerFileURL"
                                value={form.answerFileURL}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="status" className="block text-sm font-semibold leading-6 text-gray-900">
                            Status
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="status"
                                id="status"
                                value={form.status}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div> */}
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                        {isLoading ? 'Đang tạo...' : 'Tạo câu hỏi'}
                    </button>
                </div>
            </form>
        </div>
    );
}
