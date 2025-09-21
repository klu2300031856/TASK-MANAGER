package com.klef.sdp.dto;

public class ProgressResponse {
    private long completed;
    private long pending;
    private long notCompleted;
    private double completionPercentage;
    private int total;

    public ProgressResponse() {}

    public ProgressResponse(long completed, long pending, long notCompleted, double completionPercentage, int total) {
        this.completed = completed;
        this.pending = pending;
        this.notCompleted = notCompleted;
        this.completionPercentage = completionPercentage;
        this.total = total;
    }

    // getters / setters
    public long getCompleted() { return completed; }
    public void setCompleted(long completed) { this.completed = completed; }

    public long getPending() { return pending; }
    public void setPending(long pending) { this.pending = pending; }

    public long getNotCompleted() { return notCompleted; }
    public void setNotCompleted(long notCompleted) { this.notCompleted = notCompleted; }

    public double getCompletionPercentage() { return completionPercentage; }
    public void setCompletionPercentage(double completionPercentage) { this.completionPercentage = completionPercentage; }

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }
}
