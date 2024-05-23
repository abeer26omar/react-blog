import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react'
import { Dialog } from '@headlessui/react';
import { deletePost } from '../http/blog';
import Loader from '../ui/Loader';
import Success from '../ui/Success';
import Error from '../ui/Error';
import Modal from '../ui/Modal';
import {handleApiError} from '../http/ErrorHandler';

export default function DeleteModal(props: any) {

  const cancelButtonRef = useRef(null);
  const [successMsg, setSuccessMsg] = useState<string>('');

  const { mutate, isSuccess, isError, error, isPending} = useMutation({
    mutationFn: (id: number) => {
      return deletePost(id)
    },
    onSuccess: () => {
        setSuccessMsg('post Deleted Successfully')
        setTimeout(()=>{
            setSuccessMsg('')
            props.onClose()
        }, 1000)
    }
  })

  const deletePostId = () => {
    mutate(props.postId);
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete Post
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to Delete This Post?
                          This action cannot be undone.
                        </p>
                    </div>
                    {isPending && <Loader />}
                    {(isSuccess && successMsg!== '') && <Success message={successMsg} />}
                    {isError && <Error errorValue={handleApiError(error)} />}
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={deletePostId}
            >Delete</button>
            <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={props.onClose}
                ref={cancelButtonRef}
            >Cancel</button>
        </div>
    </Modal>
  )
}
