import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../http/blog';
import { Post } from '../modal/ApiResponsModal';
import { useEffect, useState } from 'react';
import DeleteModal from './DeleteModal';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import {handleApiError} from '../http/ErrorHandler';
import { motion } from 'framer-motion';
import Search  from '../components/Search';

const Blog = () => {

    const [openDel, setOpenDel] = useState<boolean>(false);
    const [openView, setOpenView] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [empty, setEmpty] = useState<string>('');


    const [postId, setPostId] = useState<number>(0);
    const [post, setPost] = useState<{}>({});


    const closeDelModal = () => setOpenDel(false);
    const closeViewModal = () => setOpenView(false);
    const closeEditModal = () => setOpenEdit(false);

    const { data: posts, isPending, isError, error } = useQuery({
        queryKey: ['blog-posts'],
        queryFn: () => getPosts(),
        
    });

    const [cards, setCards] = useState(posts?.slice(0, 9));
    const [visibleCards, setVisibleCards] = useState(6);

    useEffect(() => {
        setCards(posts?.slice(0, visibleCards) ?? []);
    }, [posts, visibleCards]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.scrollHeight - 100
        ) {
            setVisibleCards(prevVisibleCards => prevVisibleCards + 6);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getSearchResults = (data: []) => {
        setCards(data?.slice(0, 9));
        if(data?.length === 0){
            setEmpty('there is no posts');
        }else{
            setEmpty('');
        }
    };

    const getDeletedResult = (data: []) => {
        setCards(data?.slice(0, 9));
    };

    return (
        <>
            <section className="bg-white pb-6">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    <div className="container mx-auto px-0 p-0 sm:p-6 bg-white">
                        <div className="mb-16 text-center">
                            <h4 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Posts</h4>
                            <p className="mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900">The Innovations Never Stop</p>
                        </div>
                        <div className='flex justify-end mb-4'>
                            <Search posts={posts} getSearchResults={getSearchResults} />
                        </div>
                        {isPending && <Loader />}
                        {isError && <Error errorValue={handleApiError(error)} />}
                        {(empty && empty !== '') && <Error errorValue={empty} />}

                        <div className="flex flex-wrap my-12">
                            {cards && cards?.slice(0, visibleCards).map((post: Post, index: number)=>{
                                const applayIndexedStyles = () => {
                                    if (index % 3 === 1){
                                        return 'lg:w-1/3 md:border-r';
                                    } else if (index  % 3 === 2) {
                                        return 'md:border-r lg:w-1/3 lg:border-r-0';
                                    }else{
                                        return 'md:border-r lg:w-1/3';
                                    }
                                }
                                return (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }} 
                                        className={`w-full border-b md:w-1/2 sm:p-8 p-3 ${applayIndexedStyles()}`} 
                                        key={post.id}>
                                        <div className="flex items-center mb-6">
                                            <div className="text-xl dynamic_wraper--1">{post.title}</div>
                                        </div>
                                        <p className="leading-loose text-gray-500 dynamic_wraper--3 mb-6">{post.body}</p>
                                        <div className="flex flex-wrap justify-around gap-2">
                                            <button
                                                type="button"
                                                onClick={()=>
                                                    {
                                                        setOpenView(true)
                                                        setPostId(post.id)
                                                    }
                                                }
                                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                View
                                            </button>
                                            <button
                                                type="button"
                                                onClick={()=>
                                                    {
                                                        setOpenDel(true)
                                                        setPostId(post.id)
                                                    }
                                                }
                                                className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                onClick={()=>
                                                    {
                                                        setOpenEdit(true)
                                                        setPost(post)
                                                    }
                                                }
                                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </motion.div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </section>
            <DeleteModal 
                open={openDel}
                onClose={closeDelModal}
                postId={postId}
                posts={posts}
                getDeletedResult={getDeletedResult}
            />
            <ViewModal 
                open={openView}
                onClose={closeViewModal}
                postId={postId}
            />
            <EditModal 
                open={openEdit}
                onClose={closeEditModal}
                post={post}
            />
        </>
    )
}
export default Blog;