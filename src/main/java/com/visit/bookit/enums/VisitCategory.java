package com.visit.bookit.enums;

/**
 * Class with enums for tags.
 */
public enum VisitCategory {
    HAIRDRESSER("HAIRDRESSER"),
    BEAUTICIAN("BEAUTICIAN"),
    DOCTOR("DOCTOR");

    private final String displayValue;

    private VisitCategory(String displayValue) {
        this.displayValue = displayValue;
    }

    /**
     * @return enum for tag
     */
    public String getDisplayValue() {
        return displayValue;
    }

}
