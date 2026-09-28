"""
FormAI - Google Analytics 4 (GA4) Analytics CLI & API Helper
Provides automated reporting, traffic acquisition analysis, engagement metrics,
and conversion monitoring without manual CSV/Excel exports.
"""

import os
import sys
import argparse
from datetime import datetime

# Garantizar compatibilidad de salida UTF-8 en consola de Windows
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
    RunRealtimeReportRequest,
    OrderBy,
)

DEFAULT_PROPERTY_ID = "511285754"
DEFAULT_CREDENTIALS_PATH = r"C:\Users\gyust\GY Antigravity\Antigravity-Master\config\ga4_formai_credentials.json"


def get_client(credentials_path=None):
    cred_file = credentials_path or os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", DEFAULT_CREDENTIALS_PATH)
    if not os.path.exists(cred_file):
        raise FileNotFoundError(f"Credentials file not found at: {cred_file}")
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_file
    return BetaAnalyticsDataClient()


def get_overview(property_id=DEFAULT_PROPERTY_ID, days=30):
    client = get_client()
    req = RunReportRequest(
        property=f"properties/{property_id}",
        metrics=[
            Metric(name="sessions"),
            Metric(name="activeUsers"),
            Metric(name="screenPageViews"),
            Metric(name="averageSessionDuration"),
            Metric(name="bounceRate"),
            Metric(name="engagementRate"),
        ],
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
    )
    res = client.run_report(req)
    if not res.rows:
        return {}
    row = res.rows[0]
    return {
        "sessions": int(row.metric_values[0].value),
        "active_users": int(row.metric_values[1].value),
        "page_views": int(row.metric_values[2].value),
        "avg_duration_sec": float(row.metric_values[3].value),
        "bounce_rate": float(row.metric_values[4].value),
        "engagement_rate": float(row.metric_values[5].value),
    }


def get_sources(property_id=DEFAULT_PROPERTY_ID, days=30):
    client = get_client()
    req = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[
            Dimension(name="sessionSourceMedium"),
            Dimension(name="sessionDefaultChannelGroup"),
        ],
        metrics=[
            Metric(name="sessions"),
            Metric(name="activeUsers"),
            Metric(name="engagementRate"),
            Metric(name="averageSessionDuration"),
        ],
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=20,
    )
    res = client.run_report(req)
    data = []
    for r in res.rows:
        data.append({
            "source_medium": r.dimension_values[0].value,
            "channel": r.dimension_values[1].value,
            "sessions": int(r.metric_values[0].value),
            "users": int(r.metric_values[1].value),
            "engagement_rate": float(r.metric_values[2].value),
            "avg_duration_sec": float(r.metric_values[3].value),
        })
    return data


def get_pages(property_id=DEFAULT_PROPERTY_ID, days=30):
    client = get_client()
    req = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="pagePath"), Dimension(name="pageTitle")],
        metrics=[
            Metric(name="screenPageViews"),
            Metric(name="activeUsers"),
            Metric(name="userEngagementDuration"),
        ],
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="screenPageViews"), desc=True)],
        limit=20,
    )
    res = client.run_report(req)
    data = []
    for r in res.rows:
        data.append({
            "path": r.dimension_values[0].value,
            "title": r.dimension_values[1].value,
            "views": int(r.metric_values[0].value),
            "users": int(r.metric_values[1].value),
            "total_engagement_sec": float(r.metric_values[2].value),
        })
    return data


def get_events(property_id=DEFAULT_PROPERTY_ID, days=30):
    client = get_client()
    req = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="eventName")],
        metrics=[Metric(name="eventCount"), Metric(name="totalUsers")],
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)],
        limit=20,
    )
    res = client.run_report(req)
    data = []
    for r in res.rows:
        data.append({
            "event": r.dimension_values[0].value,
            "count": int(r.metric_values[0].value),
            "users": int(r.metric_values[1].value),
        })
    return data


def get_realtime(property_id=DEFAULT_PROPERTY_ID):
    client = get_client()
    req = RunRealtimeReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="country"), Dimension(name="unifiedScreenName")],
        metrics=[Metric(name="activeUsers")],
    )
    res = client.run_realtime_report(req)
    data = []
    for r in res.rows:
        data.append({
            "country": r.dimension_values[0].value,
            "screen": r.dimension_values[1].value,
            "active_users": int(r.metric_values[0].value),
        })
    return data


def print_summary(days=30, property_id=DEFAULT_PROPERTY_ID):
    print("=" * 60)
    print(f"📊 FORMAI.ES - GA4 DASHBOARD ANALYTICS (Últimos {days} días)")
    print("=" * 60)
    
    overview = get_overview(property_id, days)
    if overview:
        print(f"👥 Usuarios Activos:        {overview['active_users']}")
        print(f"🔄 Sesiones Totales:        {overview['sessions']}")
        print(f"📄 Páginas Vistas:          {overview['page_views']}")
        print(f"⏱️ Tiempo Medio Sesión:     {overview['avg_duration_sec']:.1f}s")
        print(f"📈 Tasa de Interacción:     {overview['engagement_rate']*100:.1f}%")
        print(f"🚪 Tasa de Rebote:          {overview['bounce_rate']*100:.1f}%")
    else:
        print("No hay datos de resumen para este periodo.")

    print("\n" + "-" * 60)
    print("🚀 FUENTES DE TRÁFICO (Canales y Medios)")
    print("-" * 60)
    sources = get_sources(property_id, days)
    for s in sources:
        print(f"• {s['source_medium']} [{s['channel']}]: {s['sessions']} ses | {s['users']} usr | {s['engagement_rate']*100:.0f}% engag | {s['avg_duration_sec']:.0f}s")

    print("\n" + "-" * 60)
    print("📌 PÁGINAS MÁS VISITADAS")
    print("-" * 60)
    pages = get_pages(property_id, days)
    for p in pages:
        avg_time = (p['total_engagement_sec'] / p['users']) if p['users'] > 0 else 0
        print(f"• {p['path']}: {p['views']} vistas | {p['users']} usuarios | {avg_time:.0f}s promedio")

    print("\n" + "-" * 60)
    print("⚡ EVENTOS E INTERACCIONES CLAVE")
    print("-" * 60)
    events = get_events(property_id, days)
    for e in events:
        print(f"• {e['event']}: {e['count']} veces ({e['users']} usuarios)")
    print("=" * 60)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="FormAI GA4 Analytics")
    parser.add_argument("--days", type=int, default=30, help="Period in days (default: 30)")
    parser.add_argument("--property", type=str, default=DEFAULT_PROPERTY_ID, help="GA4 Property ID")
    parser.add_argument("--realtime", action="store_true", help="Fetch realtime active users")
    args = parser.parse_args()

    if args.realtime:
        rt = get_realtime(args.property)
        print("Usuarios en tiempo real (últimos 30 min):", rt)
    else:
        print_summary(args.days, args.property)
