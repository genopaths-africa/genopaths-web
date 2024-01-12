import React from "react";
    
import { IResourceComponentsProps, useTranslate, useGo, useGetToPath, useOne } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import {
    ScrollArea,
    Table,
    Pagination,
    Group,
    Button,
    Menu,
    Text,
    Box,
    Card,
    Title,
} from "@mantine/core";
import {
    List,
    EditButton,
    ShowButton,
    DeleteButton
} from "@refinedev/mantine";
import { IconDatabase } from '@tabler/icons-react';
import { IProject } from "interfaces";
import {
    IconSettings,
    IconChartLine
} from '@tabler/icons-react';
import type { ColumnDef, flexRender, createColumnHelper } from "@tanstack/react-table";
import { ColumnFilter, ColumnSorter } from "../../components/table";
import { useNavigate, useParams } from "react-router-dom";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
} from 'react-leaflet';
// import L, { LatLng, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import './analysis.css';
import Chart from './chart';

//Fix icons
//delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });


export const ProjectAnalysis: React.FC = () => {
    const navigate = useNavigate();
    let { projectId } = useParams();
    
    // const map = Reacat.useRef

    const position = [0.3475964, 32.5825197];

    const { data: projectData } = useOne({
       resource: "projects",
       id: projectId+""
    });

    return (<>
        <Card shadow="sm" padding="md" radius="md" mb={10}>
            <Title order={3}>{projectData?.data.name}</Title>
            <Card.Section>
                <div style={{height: 400}}>
                <MapContainer center={[0.3475964, 32.5825197]} zoom={13} scrollWheelZoom={false} className="map-container"
                    style={{ width: "100%", height: "calc(100vh - 4rem)" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[0.3475964, 32.5825197]}>
                        <Popup>
                            
                        </Popup>
                </Marker>

                </MapContainer>
                </div>
            </Card.Section>
        </Card>

        <Card>
            
            <Card.Section>
                <Chart />
            </Card.Section>
        </Card>
    </>);
};
