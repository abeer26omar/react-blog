import { useQuery } from '@tanstack/react-query';
import { Dialog } from '@headlessui/react';
import { viewPost } from '../http/blog';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import Modal from '../ui/Modal';
import { handleApiError } from '../http/ErrorHandler';

export default function ViewModal(props: any) {

    const { data: post, isPending, isError, error } = useQuery({
        queryKey: ['blog-post', props.postId],
        queryFn: () => viewPost(props.postId),
        enabled: !!props.postId,
    });
  

  return (
    <Modal open={props.open} onClose={props.onClose}>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                {isPending && <Loader />}
                {isError && <Error errorValue={handleApiError(error)} />}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {post?.title}
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {post?.body}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
  )
}
