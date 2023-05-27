export class DateUtils {
    public static validateFormat(date: string): boolean {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!date.match(regEx)) return false;  // Invalid format
        var d = new Date(date);
        var dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === date;
    }
}