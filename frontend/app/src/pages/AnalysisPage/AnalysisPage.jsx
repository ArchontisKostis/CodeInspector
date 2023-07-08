// analysis page component
// Description: This is the analysis page component. It is the page that the user sees when they visit the website.

import React from 'react';

import './AnalysisPage.css';
import AnalysisForm from "../../components/AnalysisForm/AnalysisForm.jsx";
import HotspotAnalysis from "../../components/HotspotAnalysis/HotspotAnalysis.jsx";
import AnalysisSectionHeader from "../../ui/analysis/AnalysisSectionHeader/AnalysisSectionHeader.jsx";
import AnalysisInfoBox from "../../ui/analysis/AnalysisInfoBox/AnalysisInfoBox.jsx";
import AnalysisMetricsBox from "../../ui/analysis/AnalysisMetricsBox/AnalysisMetricsBox.jsx";
import ScatterPlot from "../../ui/charts/ScatterPlot/ScatterPlot.jsx";
import AnalysisFileBox from "../../ui/analysis/AnalysisFileBox/AnalysisFileBox.jsx";

const AnalysisPage = (props) => {

    const data =  [
        {
            "name": "PhysioAssistantBackendApplication.java",
            "metrics": {
                "CC": 1,
                "NLOC": 9,
                "CHURN": 1
            },
            "priority": "NOT_SET"
        },
        {
            "name": "PhysioAssistantBackendApplicationTests.java",
            "metrics": {
                "CC": 1,
                "NLOC": 9,
                "CHURN": 0
            },
            "priority": "NOT_SET"
        },
        {
            "name": "Authentication.java",
            "metrics": {
                "CC": 0,
                "NLOC": 7,
                "CHURN": 1
            },
            "priority": "NOT_SET"
        },
        {
            "name": "LoginRequest.java",
            "metrics": {
                "CC": 0,
                "NLOC": 12,
                "CHURN": 0
            },
            "priority": "NOT_SET"
        },
        {
            "name": "LoginResponse.java",
            "metrics": {
                "CC": 2,
                "NLOC": 15,
                "CHURN": 2
            },
            "priority": "NOT_SET"
        },
        {
            "name": "AlreadyAddedException.java",
            "metrics": {
                "CC": 1,
                "NLOC": 6,
                "CHURN": 0
            },
            "priority": "NOT_SET"
        },
        {
            "name": "NotFoundException.java",
            "metrics": {
                "CC": 1,
                "NLOC": 6,
                "CHURN": 0
            },
            "priority": "NOT_SET"
        },
        {
            "name": "PhysioAction.java",
            "metrics": {
                "CC": 0,
                "NLOC": 24,
                "CHURN": 1
            },
            "priority": "NOT_SET"
        },
        {
            "name": "User.java",
            "metrics": {
                "CC": 0,
                "NLOC": 11,
                "CHURN": 4
            },
            "priority": "LOW"
        },
        {
            "name": "Admin.java",
            "metrics": {
                "CC": 0,
                "NLOC": 15,
                "CHURN": 2
            },
            "priority": "NOT_SET"
        },
        {
            "name": "Doctor.java",
            "metrics": {
                "CC": 0,
                "NLOC": 22,
                "CHURN": 3
            },
            "priority": "LOW"
        },
        {
            "name": "AdminUserRepository.java",
            "metrics": {
                "CC": 0,
                "NLOC": 7,
                "CHURN": 2
            },
            "priority": "NOT_SET"
        },
        {
            "name": "AdminController.java",
            "metrics": {
                "CC": 8,
                "NLOC": 65,
                "CHURN": 5
            },
            "priority": "UNKNOWN"
        },
        {
            "name": "AdminUserService.java",
            "metrics": {
                "CC": 8,
                "NLOC": 39,
                "CHURN": 4
            },
            "priority": "NORMAL"
        },
        {
            "name": "PhysioActionRepository.java",
            "metrics": {
                "CC": 0,
                "NLOC": 5,
                "CHURN": 0
            },
            "priority": "NOT_SET"
        },
        {
            "name": "PhysioActionService.java",
            "metrics": {
                "CC": 7,
                "NLOC": 36,
                "CHURN": 0
            },
            "priority": "NORMAL"
        },
        {
            "name": "PhysioActionController.java",
            "metrics": {
                "CC": 5,
                "NLOC": 38,
                "CHURN": 2
            },
            "priority": "LOW"
        },
        {
            "name": "DoctorRepository.java",
            "metrics": {
                "CC": 0,
                "NLOC": 5,
                "CHURN": 2
            },
            "priority": "NOT_SET"
        },
        {
            "name": "DoctorService.java",
            "metrics": {
                "CC": 7,
                "NLOC": 34,
                "CHURN": 9
            },
            "priority": "HIGH"
        },
        {
            "name": "DoctorController.java",
            "metrics": {
                "CC": 9,
                "NLOC": 62,
                "CHURN": 8
            },
            "priority": "HIGH"
        },
        {
            "name": "Patient.java",
            "metrics": {
                "CC": 0,
                "NLOC": 22,
                "CHURN": 4
            },
            "priority": "LOW"
        },
        {
            "name": "PatientRepository.java",
            "metrics": {
                "CC": 0,
                "NLOC": 5,
                "CHURN": 6
            },
            "priority": "MEDIUM"
        },
        {
            "name": "PatientService.java",
            "metrics": {
                "CC": 7,
                "NLOC": 34,
                "CHURN": 10
            },
            "priority": "HIGH"
        },
        {
            "name": "PatientController.java",
            "metrics": {
                "CC": 9,
                "NLOC": 63,
                "CHURN": 9
            },
            "priority": "HIGH"
        },
        {
            "name": "AppointmentController.java",
            "metrics": {
                "CC": 9,
                "NLOC": 68,
                "CHURN": 6
            },
            "priority": "HIGH"
        },
        {
            "name": "Appointment.java",
            "metrics": {
                "CC": 0,
                "NLOC": 29,
                "CHURN": 7
            },
            "priority": "MEDIUM"
        },
        {
            "name": "AppointmentStatus.java",
            "metrics": {
                "CC": 0,
                "NLOC": 6,
                "CHURN": 1
            },
            "priority": "NOT_SET"
        },
        {
            "name": "AppointmentRepository.java",
            "metrics": {
                "CC": 0,
                "NLOC": 12,
                "CHURN": 4
            },
            "priority": "LOW"
        },
        {
            "name": "AppointmentService.java",
            "metrics": {
                "CC": 7,
                "NLOC": 35,
                "CHURN": 5
            },
            "priority": "UNKNOWN"
        },
        {
            "name": "AppointmentDTO.java",
            "metrics": {
                "CC": 1,
                "NLOC": 32,
                "CHURN": 1
            },
            "priority": "NOT_SET"
        },
        {
            "name": "CreateAppointmentRequest.java",
            "metrics": {
                "CC": 0,
                "NLOC": 16,
                "CHURN": 1
            },
            "priority": "NOT_SET"
        },
        {
            "name": "CreatePatientRequest.java",
            "metrics": {
                "CC": 0,
                "NLOC": 15,
                "CHURN": 2
            },
            "priority": "NOT_SET"
        },
        {
            "name": "VisitController.java",
            "metrics": {
                "CC": 4,
                "NLOC": 31,
                "CHURN": 1
            },
            "priority": "LOW"
        },
        {
            "name": "CreateVisitRequest.java",
            "metrics": {
                "CC": 0,
                "NLOC": 14,
                "CHURN": 0
            },
            "priority": "NOT_SET"
        },
        {
            "name": "Visit.java",
            "metrics": {
                "CC": 4,
                "NLOC": 44,
                "CHURN": 2
            },
            "priority": "LOW"
        },
        {
            "name": "VisitRepository.java",
            "metrics": {
                "CC": 0,
                "NLOC": 9,
                "CHURN": 0
            },
            "priority": "NOT_SET"
        },
        {
            "name": "VisitService.java",
            "metrics": {
                "CC": 4,
                "NLOC": 36,
                "CHURN": 2
            },
            "priority": "LOW"
        },
        {
            "name": "PatientHistoryResponse.java",
            "metrics": {
                "CC": 0,
                "NLOC": 14,
                "CHURN": 0
            },
            "priority": "NOT_SET"
        },
        {
            "name": "AppointmentServiceTest.java",
            "metrics": {
                "CC": 11,
                "NLOC": 156,
                "CHURN": 1
            },
            "priority": "NORMAL"
        },
        {
            "name": "DoctorServiceTest.java",
            "metrics": {
                "CC": 10,
                "NLOC": 116,
                "CHURN": 2
            },
            "priority": "NORMAL"
        },
        {
            "name": "PatientServiceTest.java",
            "metrics": {
                "CC": 10,
                "NLOC": 142,
                "CHURN": 2
            },
            "priority": "NORMAL"
        },
        {
            "name": "AdminUserServiceTest.java",
            "metrics": {
                "CC": 7,
                "NLOC": 79,
                "CHURN": 3
            },
            "priority": "NORMAL"
        },
        {
            "name": "AccountGenerator.java",
            "metrics": {
                "CC": 6,
                "NLOC": 35,
                "CHURN": 0
            },
            "priority": "NORMAL"
        },
        {
            "name": "PhysioActionServiceTest.java",
            "metrics": {
                "CC": 9,
                "NLOC": 97,
                "CHURN": 1
            },
            "priority": "NORMAL"
        },
        {
            "name": "VisitServiceTest.java",
            "metrics": {
                "CC": 5,
                "NLOC": 73,
                "CHURN": 0
            },
            "priority": "LOW"
        }
    ]

        return (
            <>
                <div className="analysis-container">
                    <div className="analysis-input-container">

                        <AnalysisForm />

                        <div className="wave-light"></div>

                    </div>

                    <HotspotAnalysis />

                    <AnalysisSectionHeader
                        title="Analysis Info"
                        icon="bi bi-info-circle-fill" />

                    <AnalysisInfoBox
                        projectName={"Project Name"}
                        totalCommits={"Total Commits"}
                        fromDate={"From Date"}
                        toDate={"To Date"}
                        githubUrl={"GitHub URL"}
                    />

                    <AnalysisSectionHeader
                        title="General Metrics"
                        icon="bi bi-speedometer" />

                    <AnalysisMetricsBox
                        avgCC={10}
                        avgChurn={2.34}
                        avgNLOC={2.34}
                        totalNLOC={2.34}
                        totalFiles={2.34}
                        totalHotspots={2.34}
                    />

                    <AnalysisSectionHeader
                        title="Hotspot Prioritization Matrix"
                        icon="bi bi-graph-up" />

                    <ScatterPlot data={data} />

                    <AnalysisSectionHeader
                        title="Max Complexity File"
                        icon="bi bi-file-earmark-code" />

                    <AnalysisFileBox
                        fileName={"filename.java"}
                        cc={10}
                        churn={7}
                        nloc={34}
                    />

                    <AnalysisSectionHeader
                        title="Max Churn File"
                        icon="bi bi-file-earmark-code" />

                    <AnalysisFileBox
                        fileName={"filename.java"}
                        cc={4}
                        churn={32}
                        nloc={34}
                    />

                    <div className="btn">

                        <button className="export-to-csv-btn">
                            <i className="bi bi-filetype-csv"></i>
                            <p>Export to CSV</p>
                        </button>
                    </div>

                    <div className="wave-dark"></div>
                </div>


            </>
        );
}

export default AnalysisPage;