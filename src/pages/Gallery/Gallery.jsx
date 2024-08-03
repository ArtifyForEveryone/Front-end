import AllArtList from '../../components/AllArtList';
import BestSellerArtList from '../../components/BestSellerArtList';
import PopularArtList from '../../components/PopularArtList';

const Gallery = () => {
    return (
        <div>
            <div className='h-full py-28 mt-5 bg-gray-100'>
                <h1 className='text-center font-semibold mb-3 uppercase text-4xl'>Begin an <span className='text-[#2f6a81] font-bold'>exploration</span> through</h1>
                <h1 className='text-center font-semibold mb-10 uppercase text-4xl'>a <span className='text-[#2f6a81] font-bold'>gallery</span> showcasing artisan creativity</h1>
                <h2 className='text-center font-medium mb-20 text-base'>Step into a realm of artistic expression, where Artify showcases the extraodinary works of talented artists across the global.</h2>
                <PopularArtList />
                <BestSellerArtList />
                <AllArtList />
            </div>
        </div>
    );
}

export default Gallery