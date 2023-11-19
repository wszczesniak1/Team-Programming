package com.visit.bookit.enums;

public enum VisitCategory {
    HAIRDRESSER("HAIRDRESSER"),
    BEAUTICIAN("BEAUTICIAN"),
    DOCTOR("DOCTOR");

    private final String displayValue;

    private VisitCategory(String displayValue) {
        this.displayValue = displayValue;
    }

    public String getDisplayValue() {
        return displayValue;
    }

}
