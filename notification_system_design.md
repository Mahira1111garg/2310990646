# Notification System Design

## Problem Statement
The objective of this project is to build a robust notification system that can fetch, prioritize, and display notifications in real-time. Since notifications come in different types and varying levels of urgency, a simple chronological display is insufficient. The challenge is computing and providing a "top N" list of notifications prioritizing high-impact messages while still factoring in recency for tie-breaking scenarios.
Min Heap of size N → O(log N)
## Priority Logic
To decide which notification matters the most, each notification type is mapped to a priority weight. Notifications with a higher weight must take precedence over notifications with a lower weight. 

## Weight Mapping
The priority system works on the following exact weight mapping:
- **Placement** = 3
- **Result** = 2
- **Event** = 1

## Sorting Logic
The system collects notifications and sorts them fundamentally based on two criteria applied sequentially:
1. **Priority Weight (Primary):** Notifications are sorted by their corresponding weight mapping descending (3 > 2 > 1).
2. **Timestamp Recency (Secondary/Tie-breaker):** If two notifications share the same exact `Type`, their timestamp represents the deciding factor.

## Explanation of Recency
Recency is implemented strictly as a tie-breaker. Between two notifications of identical importance (e.g., both are `Placement` notifications), the one that arrived most recently should appear first. This ensures users are exposed to the latest updates without sacrificing priority logic.

## Edge Cases
- **Missing or Invalid Timestamp:** The system gracefully handles improperly formatted dates by ensuring date parsing fallbacks or validations.
- **Unacknowledged Types:** Unknown notification types not listed in the `weightMap` will default to a minimal priority below Event or can be omitted depending on operational requirements.
- **Empty Datasets:** Handled elegantly without failing endpoints; empty arrays are returned by the fetch utility and passed to controllers securely.

## Scalability
The currently implemented approach directly sorts an array of notifications, resulting in an O(M log M) time complexity where M is the number of total notifications. This is acceptable for small inputs, but for massive ingestion volumes under scale:

To efficiently maintain top N notifications in real-time, a Min Heap of size N can be used, reducing time complexity to O(log N) per insertion.
