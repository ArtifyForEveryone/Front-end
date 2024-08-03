import { ConfigProvider, Tabs } from 'antd';
import "./AboutPrivacy.scss";

const { TabPane } = Tabs;

const items = [
    {
        key: '1',
        label: 'About us',
        header: 'About Us',
        paragraph: "Welcome to Artify, the ultimate platform for sharing and discovering artwork from talented artists around the world. Our mission is to provide a space where artists can showcase their creativity and connect with a vibrant community of art enthusiasts. Whether you're an established artist or just starting out, Artify offers a supportive environment to share your passion for art and explore a diverse range of styles and mediums. Join us in celebrating the beauty of art and unleash your creative potential with Artify.",
    },
    {
        key: '2',
        label: 'Our mission',
        header: 'Our Mission',
        paragraph: "At Artify, our mission is to empower artists by providing them with a platform to share their work, gain exposure, and connect with fellow creators and art lovers. We believe that art has the power to inspire, provoke thought, and spark meaningful conversations. By fostering a supportive and inclusive community, we aim to make art accessible to everyone and create opportunities for artists to thrive. Join us on our mission to celebrate creativity, diversity, and the transformative power of art.",
    },
    {
        key: '3',
        label: 'Meet the Team',
        header: 'Our Team',
        paragraph: "Meet the talented individuals who make Artify possible. Our team is comprised of dedicated artists, designers, developers, and art enthusiasts who are passionate about supporting the global art community. Together, we work tirelessly to improve and expand Artify, ensuring that artists have the tools and resources they need to succeed. Get to know the faces behind Artify and discover the diverse skills and expertise that drive our platform forward.",
    },
];

const About = () => {
    return (
        <div className='h-full mb-30 w-[1000px] mx-auto'>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemActiveColor: '#2f6a81 !important',
                            itemHoverColor: '#2f6a81 !important',
                            itemColor: '#000000 !important',
                            itemSelectedColor: '#2f6a81 !important',
                        },
                    },
                }}
            >
                <Tabs
                    tabPosition={'left'}
                    className='contentTab'
                    defaultActiveKey={items[0].key}
                >
                    {items.map(item => (
                        <TabPane tab={item.label} key={item.key}>
                            <div className='pl-[32px]'>
                                <h1 className='text-2xl font-medium pb-5'>{item.header}</h1>
                                <p className='text-base text-justify'>{item.paragraph}</p>
                            </div>
                        </TabPane>
                    ))}
                </Tabs>
            </ConfigProvider>
        </div>
    );
}

export default About;