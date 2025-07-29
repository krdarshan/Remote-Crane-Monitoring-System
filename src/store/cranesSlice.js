import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cranes: [
    {
      id: 'crane-1',
      name: 'ACE Mobile Crane',
      model: 'ACE NX-150',
      location: 'Construction Site A',
      status: 'operational',
      lastMaintenance: '2024-03-15',
      image: 'https://5.imimg.com/data5/SELLER/Default/2021/3/KO/QG/XG/3922575/ace-nx-150-truck-mounted-crane.jpg',
      metrics: {
        uptime: 95,
        efficiency: 88
      },
      systems: {
        hydraulic: {
          pressure: 75,
          fluidLevel: 85,
          pumpEfficiency: 92,
          leakStatus: 'normal'
        },
        engine: {
          fuelConsumption: 28,
          voltage: 24,
          temperature: 82,
          powerLoad: 65
        },
        loadHandling: {
          currentLoad: 12.5,
          maxCapacity: 20,
          ropeCondition: 'good',
          hookStatus: 'normal'
        },
        braking: {
          padThickness: 18,
          performance: 95,
          responseTime: 150
        },
        gearbox: {
          oilLevel: 90,
          temperature: 65,
          efficiency: 88
        },
        control: {
          systemStatus: 'operational',
          sensorStatus: 'normal',
          automationHealth: 95
        }
      }
    },
    {
      id: 'crane-2',
      name: 'Tower Construction Crane',
      model: 'Liebherr 550 EC-H',
      location: 'Construction Site B',
      status: 'maintenance',
      lastMaintenance: '2024-02-28',
      image: 'https://m.media-amazon.com/images/I/71jGvk0FXVL._AC_UF1000,1000_QL80_.jpg',
      metrics: {
        uptime: 82,
        efficiency: 75
      },
      systems: {
        hydraulic: {
          pressure: 82,
          fluidLevel: 70,
          pumpEfficiency: 85,
          leakStatus: 'warning'
        },
        engine: {
          fuelConsumption: 35,
          voltage: 23.5,
          temperature: 88,
          powerLoad: 78
        },
        loadHandling: {
          currentLoad: 15,
          maxCapacity: 25,
          ropeCondition: 'fair',
          hookStatus: 'normal'
        },
        braking: {
          padThickness: 12,
          performance: 82,
          responseTime: 180
        },
        gearbox: {
          oilLevel: 75,
          temperature: 72,
          efficiency: 80
        },
        control: {
          systemStatus: 'maintenance',
          sensorStatus: 'warning',
          automationHealth: 82
        }
      }
    },
    {
      id: 'crane-3',
      name: 'Crawler Crane',
      model: 'Manitowoc 18000',
      location: 'Construction Site C',
      status: 'critical',
      lastMaintenance: '2024-03-01',
      image: 'https://www.cranesy.com/upload/crawler-crane.jpg',
      metrics: {
        uptime: 65,
        efficiency: 60
      },
      systems: {
        hydraulic: {
          pressure: 92,
          fluidLevel: 60,
          pumpEfficiency: 75,
          leakStatus: 'critical'
        },
        engine: {
          fuelConsumption: 42,
          voltage: 22,
          temperature: 95,
          powerLoad: 88
        },
        loadHandling: {
          currentLoad: 18,
          maxCapacity: 30,
          ropeCondition: 'warning',
          hookStatus: 'warning'
        },
        braking: {
          padThickness: 8,
          performance: 70,
          responseTime: 220
        },
        gearbox: {
          oilLevel: 65,
          temperature: 85,
          efficiency: 72
        },
        control: {
          systemStatus: 'warning',
          sensorStatus: 'critical',
          automationHealth: 68
        }
      }
    }
  ],
  selectedCrane: null,
  status: 'idle',
  error: null
};

const cranesSlice = createSlice({
  name: 'cranes',
  initialState,
  reducers: {
    setSelectedCrane: (state, action) => {
      state.selectedCrane = action.payload;
    },
    clearSelectedCrane: (state) => {
      state.selectedCrane = null;
    },
    updateCraneStatus: (state, action) => {
      const { id, status } = action.payload;
      const crane = state.cranes.find(c => c.id === id);
      if (crane) {
        crane.status = status;
      }
    },
    updateSystemData: (state, action) => {
      const { craneId, system, data } = action.payload;
      const crane = state.cranes.find(c => c.id === craneId);
      if (crane && crane.systems[system]) {
        crane.systems[system] = { ...crane.systems[system], ...data };
      }
    }
  }
});

export const { setSelectedCrane, clearSelectedCrane, updateCraneStatus, updateSystemData } = cranesSlice.actions;

// Selectors
export const selectAllCranes = state => state.cranes.cranes;
export const selectSelectedCrane = state => state.cranes.selectedCrane;
export const selectCraneById = (state, craneId) => 
  state.cranes.cranes.find(crane => crane.id === craneId);

export default cranesSlice.reducer; 