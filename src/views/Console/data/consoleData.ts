import { ref } from 'vue'

// Function to generate random switch count between 1-3
const getRandomSwitchCount = () => Math.floor(Math.random() * 3) + 1

// Function to generate switches with proper names based on panel title
const generateSwitches = (panelTitle: string, count: number) => {
    const switches = []
    
    // Define switch names for each panel type
    const switchNames: { [key: string]: string[] } = {
        'Power Distribution': ['Main', 'Backup', 'Grid'],
        'Emergency Systems': ['Alarm', 'Override', 'Shutdown'],
        'Climate Control': ['Temp', 'Humidity', 'Flow'],
        'Security Access': ['Lock', 'Scan', 'Clearance'],
        'Communication Hub': ['Transmit', 'Receive', 'Encrypt'],
        'Navigation Systems': ['Course', 'Speed', 'Auto'],
        'Life Support': ['Oxygen', 'Pressure', 'Filter'],
        'Propulsion Control': ['Thrust', 'Direction', 'Power'],
        'Sensor Array': ['Radar', 'Lidar', 'Thermal'],
        'Data Processing': ['CPU', 'Memory', 'Cache'],
        'Network Protocols': ['Firewall', 'Router', 'Bridge'],
        'Backup Systems': ['Primary', 'Secondary', 'Tertiary'],
        'Environmental Monitor': ['Air', 'Water', 'Radiation'],
        'Radiation Shield': ['Alpha', 'Beta', 'Gamma'],
        'Atmospheric Control': ['Mix', 'Purge', 'Recycle'],
        'Waste Management': ['Collect', 'Process', 'Dispose'],
        'Cargo Systems': ['Load', 'Unload', 'Secure'],
        'Docking Bay': ['Hatch', 'Clamp', 'Seal'],
        'Maintenance Access': ['Panel', 'Hatch', 'Lock'],
        'Storage Control': ['Access', 'Monitor', 'Secure'],
        'Medical Bay': ['Sterile', 'Monitor', 'Emergency'],
        'Cryogenic Storage': ['Freeze', 'Thaw', 'Monitor'],
        'Research Lab': ['Analysis', 'Sample', 'Test'],
        'Bio Containment': ['Isolate', 'Decontam', 'Seal'],
        'Weapon Systems': ['Target', 'Fire', 'Safety'],
        'Defense Grid': ['Shield', 'Counter', 'Alert'],
        'Shield Generator': ['Primary', 'Secondary', 'Auxiliary'],
        'Tactical Display': ['Map', 'Target', 'Status'],
        'Reactor Core': ['Fusion', 'Containment', 'Coolant'],
        'Energy Distribution': ['Primary', 'Secondary', 'Emergency'],
        'Coolant Systems': ['Flow', 'Temp', 'Pressure'],
        'Fusion Control': ['Plasma', 'Magnetic', 'Thermal']
    }
    
    const names = switchNames[panelTitle] || ['Switch 1', 'Switch 2', 'Switch 3']
    
    for (let i = 0; i < count; i++) {
        switches.push({
            id: `${panelTitle}-switch-${i + 1}`,
            name: names[i] || `Switch ${i + 1}`,
            value: ref(false)
        })
    }
    
    return switches
}

// Function to create panel with switches
const createPanel = (title: string) => {
    const switchCount = getRandomSwitchCount()
    return {
        title,
        switchCount,
        switches: generateSwitches(title, switchCount)
    }
}

export const cols = [
    {
        title: 'ColOne',
        panels: [
            createPanel('Power Distribution'),
            createPanel('Emergency Systems'),
            createPanel('Climate Control'),
            createPanel('Security Access'),
            createPanel('Communication Hub'),
        ]
    },
    // {
    //     title: 'ColTwo',
    //     panels: [
    //         createPanel('Navigation Systems'),
    //         createPanel('Life Support'),
    //         createPanel('Propulsion Control'),
    //         createPanel('Sensor Array'),
    //     ]
    // },
    // {
    //     title: 'ColThree',
    //     panels: [
    //         createPanel('Data Processing'),
    //         createPanel('Network Protocols'),
    //         createPanel('Backup Systems'),
    //     ]
    // },
    // {
    //     title: 'ColFour',
    //     panels: [
    //         createPanel('Environmental Monitor'),
    //         createPanel('Radiation Shield'),
    //         createPanel('Atmospheric Control'),
    //         createPanel('Waste Management'),
    //     ]
    // },
    // {
    //     title: 'ColFive',
    //     panels: [
    //         createPanel('Cargo Systems'),
    //         createPanel('Docking Bay'),
    //         createPanel('Maintenance Access'),
    //         createPanel('Storage Control'),
    //     ]
    // },
    // {
    //     title: 'ColSix',
    //     panels: [
    //         createPanel('Medical Bay'),
    //         createPanel('Cryogenic Storage'),
    //         createPanel('Research Lab'),
    //         createPanel('Bio Containment'),
    //     ]
    // },
    // {
    //     title: 'ColSeven',
    //     panels: [
    //         createPanel('Weapon Systems'),
    //         createPanel('Defense Grid'),
    //         createPanel('Shield Generator'),
    //         createPanel('Tactical Display'),
    //     ]
    // },
    // {
    //     title: 'ColEight',
    //     panels: [
    //         createPanel('Reactor Core'),
    //         createPanel('Energy Distribution'),
    //         createPanel('Coolant Systems'),
    //         createPanel('Fusion Control'),
    //     ]
    // }
] 