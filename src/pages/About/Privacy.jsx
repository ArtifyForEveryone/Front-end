import { ConfigProvider, Tabs } from 'antd';
import "./AboutPrivacy.scss";

const { TabPane } = Tabs;

const items = [
    {
        key: '1',
        label: 'Privacy Policy',
        header: 'Privacy Policy',
        paragraph: "Protecting your privacy is important to us. This Privacy Policy explains how we collect, use, and disclose information about you when you use our services. We may collect personal information from you, such as your name, email address, and browsing activity. We use this information to provide and improve our services, communicate with you, and personalize your experience. We may also share your information with third-party service providers for purposes such as data analysis and advertising. By using our services, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.",
    },
    {
        key: '2',
        label: 'Terms of Service',
        header: 'Terms of Service',
        paragraph: "By using our services, you agree to comply with our Terms of Service. These terms govern your use of our platform and outline your rights and responsibilities as a user. You must be at least 18 years old to use our services, and you may not use our platform for any illegal or unauthorized purpose. We reserve the right to suspend or terminate your access to our services if you violate these terms. Please read our Terms of Service carefully before using our platform.",
    },
];

const Privacy = () => {
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

export default Privacy;