import { Tab, Tabs, Box } from "@mui/material";

const TabView = ({ tabs, activeTabIndex, onTabChange }) => {
    return <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTabIndex} onChange={onTabChange}>
            {
                tabs.map(({ label, sx, ...restItem }, index) => {
                    return <Tab key={'Tab' + label + index} label={label} sx={{ textTransform: 'none', ...(sx || {}) }} {...restItem} />
                })
            }
        </Tabs>
    </Box>
}

export default TabView;