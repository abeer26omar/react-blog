import { useMutation } from '@tanstack/react-query';
import { useRef, useState, useEffect } from 'react'
import { updatePost } from '../http/blog';
import Modal from '../ui/Modal';
import useFormValidation, { FormErrors } from '../hooks/FormValidation-hook';
import Loader from '../ui/Loader';
import Success from '../ui/Success';
import Error from '../ui/Error';
import { Post } from '../modal/ApiResponsModal';
import { handleApiError } from '../http/ErrorHandler';

export default function EditModal(props: any) {

    const [errorValidations, setErrorValidation] = useState<FormErrors>({});
    const [successMsg, setSuccessMsg] = useState<string>('');


    const cancelButtonRef = useRef(null);
    const { formData, errors, handleInputChange } = useFormValidation(props.post);

    const { mutate, isSuccess, isError, error, isPending} = useMutation<Post>({
        mutationFn: () => {
        return updatePost(formData.title, formData.body, props.post.id)
        },
        onSuccess: () => {
            setSuccessMsg('post Updated Successfully')
            setTimeout(()=>{
                setSuccessMsg('')
                props.onClose();
            }, 1000);
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();    
        if (Object.keys(errors).length === 0) {
            clearErrorsAndSuccess();
            mutate();

        } else {
            setErrorValidation(errors);
        }
    };

    const clearErrorsAndSuccess = () => {
        setErrorValidation({});
    };

    useEffect(() => {
        clearErrorsAndSuccess();
    }, [props.open]);


  return (
        <Modal open={props.open} onClose={props.onClose}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    {isPending && <Loader />}
                    {(isSuccess && successMsg!== '') && <Success message={successMsg} />}
                    {isError && <Error errorValue={handleApiError(error)} />}
                    {errorValidations && <Error errorValue={errorValidations}/>}
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <div className="border-b border-gray-900/10 pb-4">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Post</h2>
                                    <p className="mt-1 text-sm leading-4 text-gray-600">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                            Title
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name='title'
                                                id="username"
                                                autoComplete="username"
                                                className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="enter post title"
                                                defaultValue={props.post.title}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                style={{
                                                    overflow: 'hidden'
                                                }}
                                                id="about"
                                                name="body"
                                                rows={3}
                                                placeholder='write post description'
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={props.post.body}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button 
                                    type="button" 
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                    onClick={props.onClose}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
  )
}
