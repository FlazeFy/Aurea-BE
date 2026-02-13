import { Parser } from 'json2csv'

export const exportToCSV = (data: any[], fields: string[]) => {
    const parser = new Parser({ fields })
    return parser.parse(data)
}