import json
import sys
from pydantic import BaseModel
from typing import Any

import pandas as pd
sys.path.append("e:\\railsarthi")

from backend.main import journey_model_config
from backend.journey_model import prepare_journey_model_dataframe

features = {
    "train_number": 12919,
    "train_type": "Superfast Express",
    "year": 2024,
    "month": 9,
    "day_of_week": 1,
    "departure_hour": 10,
    "is_weekend": 0,
    "is_night_departure": 0,
    "is_peak_hour": 1,
    "is_festival_season": 0,
    "season": "Pre-Monsoon",
    "zone": "Northern Railway (NR)",
    "zone_abbr": "NR",
    "source_station_category": "A1",
    "destination_station_category": "A",
    "distance_km": 1400,
    "num_scheduled_stops": 23,
    "scheduled_travel_hours": 23.3,
    "track_doubled": 1,
    "is_hdn_route": 1,
    "traction_type": "Electric (25kV AC)",
    "is_electrified": 1,
    "psr_count": 5,
    "is_circular_route": 0,
    "is_monsoon_season": 0,
    "is_fog_risk": 0,
    "fog_risk_score": 0.1,
    "zone_fog_index": 0.2,
    "zone_congestion_index": 0.7,
    "season_severity_score": 0.2,
    "loco_age_years": 5,
    "coach_age_years": 3,
    "has_lhb_coaches": 1,
    "is_rake_shared": 0,
    "maintenance_score": 8.5,
    "seat_utilisation_pct": 0.95,
    "is_overloaded": 0,
    "late_incoming_rake": 0,
    "is_special_train": 0,
    "route_historical_ontime_pct": 75.5
}

try:
    df = prepare_journey_model_dataframe(features, journey_model_config)
    print("SUCCESS")
except Exception as e:
    print("FAILED", e.detail if hasattr(e, 'detail') else e)
