import CardArtist from '../../components/CardArtist';
import NewMemberArtist from '../../components/NewMemberArtist';
import PopularArtist from '../../components/PopularArtist';

const Artist = () => {
    return (
        <div className='h-full py-28 mt-5 bg-gray-100'>
            <h1 className='text-center font-semibold mb-3 uppercase text-4xl'>Explore the <span className='text-[#2f6a81] font-bold'>diverse talents</span> of artists</h1>
            <h1 className='text-center font-semibold mb-10 uppercase text-4xl'>featured on Artify</h1>
            <h2 className='text-center font-medium mb-20 text-base'>Step into our curated collection of artistic brilliance.<br></br>Discover the unique styles and captivating artworks created by talented artists from around the world.<br></br>With Artify, you embark on a journey through creativity, inspiration, and expression.</h2>
            <PopularArtist />
            <NewMemberArtist />
            <CardArtist />
        </div>
    );
}

export default Artist