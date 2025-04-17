import React from 'react';
import './Hmap.css'; // We'll create this CSS file for styling

const Hmap = () => {
  // Hospital building data
  const hospitalStructure = {
    buildings: [
      {
        id: 1,
        name: 'Main Hospital Building',
        floors: [
          {
            level: 'Ground Floor',
            departments: [
              {
                name: 'Emergency Department',
                rooms: ['ER-101', 'ER-102', 'Triage Room', 'Trauma Center'],
                description: '24/7 emergency services'
              },
              {
                name: 'Admissions',
                rooms: ['Reception', 'Registration Desk', 'Waiting Area'],
                description: 'Patient check-in and registration'
              },
              {
                name: 'Radiology',
                rooms: ['X-Ray Room', 'CT Scan Room', 'MRI Suite', 'Ultrasound Room'],
                description: 'Diagnostic imaging services'
              }
            ]
          },
          {
            level: 'First Floor',
            departments: [
              {
                name: 'Surgery',
                rooms: ['OR-1', 'OR-2', 'OR-3', 'Recovery Room', 'Pre-Op Area'],
                description: 'Operating theaters and surgical services'
              },
              {
                name: 'ICU',
                rooms: ['ICU-1 to ICU-10', 'Nurses Station', 'Isolation Room'],
                description: 'Intensive care unit'
              }
            ]
          },
          {
            level: 'Second Floor',
            departments: [
              {
                name: 'Maternity Ward',
                rooms: ['Delivery Room', 'Postpartum Rooms', 'NICU', 'Lactation Room'],
                description: 'Childbirth and newborn care'
              },
              {
                name: 'Pediatrics',
                rooms: ['Pediatric Ward', 'Play Room', 'Exam Rooms 201-205'],
                description: 'Child healthcare services'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Specialty Care Building',
        floors: [
          {
            level: 'Ground Floor',
            departments: [
              {
                name: 'Cardiology',
                rooms: ['Echo Lab', 'Stress Test Room', 'Cardiac Cath Lab'],
                description: 'Heart and vascular services'
              },
              {
                name: 'Oncology',
                rooms: ['Chemotherapy Suite', 'Radiation Therapy', 'Oncology Ward'],
                description: 'Cancer treatment center'
              }
            ]
          },
          {
            level: 'First Floor',
            departments: [
              {
                name: 'Neurology',
                rooms: ['EEG Lab', 'Neurology Clinic', 'Sleep Study Room'],
                description: 'Brain and nervous system care'
              },
              {
                name: 'Physical Therapy',
                rooms: ['PT Gym', 'Hydrotherapy Pool', 'Rehab Rooms'],
                description: 'Rehabilitation services'
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Outpatient Center',
        floors: [
          {
            level: 'Ground Floor',
            departments: [
              {
                name: 'General Practice',
                rooms: ['Exam Rooms 1-10', 'Vaccination Room', 'Lab Draw Station'],
                description: 'Primary care services'
              },
              {
                name: 'Pharmacy',
                rooms: ['Main Pharmacy', 'Drive-through Window'],
                description: 'Prescription services'
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div className="hospital-map-container">
      <h1>Hospital Campus Map</h1>
      <div className="map-legend">
        <h3>Map Legend</h3>
        <ul>
          <li><span className="legend-color emergency"></span> Emergency Services</li>
          <li><span className="legend-color inpatient"></span> Inpatient Care</li>
          <li><span className="legend-color outpatient"></span> Outpatient Services</li>
          <li><span className="legend-color specialty"></span> Specialty Care</li>
          <li><span className="legend-color support"></span> Support Services</li>
        </ul>
      </div>
      
      <div className="hospital-structure">
        {hospitalStructure.buildings.map(building => (
          <div key={building.id} className="building">
            <h2>{building.name}</h2>
            <div className="floors-container">
              {building.floors.map((floor, index) => (
                <div key={index} className="floor">
                  <h3>{floor.level}</h3>
                  <div className="departments">
                    {floor.departments.map((dept, deptIndex) => (
                      <div key={deptIndex} className="department">
                        <h4>{dept.name}</h4>
                        <p className="dept-description">{dept.description}</p>
                        <div className="rooms">
                          <strong>Rooms:</strong>
                          <ul>
                            {dept.rooms.map((room, roomIndex) => (
                              <li key={roomIndex}>{room}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="navigation-tips">
        <h3>Navigation Tips</h3>
        <ul>
          <li>All buildings are connected via the ground floor corridors</li>
          <li>Elevators are located in the central atrium of each building</li>
          <li>Color-coded signage helps guide to major departments</li>
          <li>Information desks are available in each building lobby</li>
        </ul>
      </div>
    </div>
  );
};

export default Hmap;