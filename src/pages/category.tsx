import React from 'react';
import { List, Page, Icon } from 'zmp-ui';

const CategoryPage: React.FunctionComponent = () => {
    return (
        <Page className="page">
            <div className="section-container">
                <List>
                    <List.Item suffix={<Icon icon="zi-arrow-right" />}>
                        <div>About</div>
                    </List.Item>
                    <List.Item suffix={<Icon icon="zi-arrow-right" />}>
                        <div>User</div>
                    </List.Item>
                </List>
            </div>
        </Page>
    );
};

export default CategoryPage;
