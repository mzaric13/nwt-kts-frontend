export interface RouteApiDTO {
    code: string;
    routes: RouteApi[];
    waypoints: Waypoint[];
}

export interface RouteApi {
    legs: Leg[],
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;
}

interface Leg {
    steps: Step[],
    summary: string;
    weight: number;
    duration: number;
    distance: number;
}

interface Step {
    geometry: Geometry;
    maneuver: Maneuver;
    mode: string;
    driving_side: string;
    name: string;
    intersections: Intersection[];
    weight: number;
    duration: number;
    distance: number;
}

interface Geometry {
    coordinates: ReversePoint[];
    type: string;
}

interface ReversePoint {
    coordinate: number[];
}

interface Maneuver {
    bearing_after: number,
    bearing_before: number,
    location: number[];
    type: string;
}

interface Intersection {
    out: number;
    entry: boolean[];
    bearings: number[];
    location: number[];
}

interface Waypoint {
    hint: string;
    distance: number;
    name: string;
    location: number[];
}