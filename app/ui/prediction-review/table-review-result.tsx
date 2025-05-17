import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { ReviewResultPredict } from "@/app/lib/types";

export default function TableReviewResult({ reviewResult }: { reviewResult: ReviewResultPredict }) {
    return (
        <div className="mt-6">
            <div>
                <h5 className="text-[20px] underline underline-offset-8">Review Hasil</h5>
            </div>
            <div className="w-[600px] my-4">
                <table>
                    <tbody>
                        <tr>
                            <td className="w-[220px]">Total Data</td>
                            <td>
                                : <span className="font-semibold">{reviewResult.total_data}</span> =&gt; <span className="font-bold text-[#3BC13B]">{reviewResult.total_correct} Prediksi Benar</span> | <span className="font-bold text-[#EC4545]">{reviewResult.total_wrong} Prediksi Salah</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="w-[220px]">Total Prediksi Berlabel 1</td>
                            <td>
                                : <span className="font-semibold">{reviewResult.total_data_label_1}</span> =&gt; <span className="font-bold text-[#3BC13B]">{reviewResult.total_correct_label_1} Prediksi Benar</span> | <span className="font-bold text-[#EC4545]">{reviewResult.total_wrong_label_1} Prediksi Salah</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="w-[220px]">Total Prediksi Berlabel 0</td>
                            <td>
                                : <span className="font-semibold">{reviewResult.total_data_label_0}</span> =&gt; <span className="font-bold text-[#3BC13B]">{reviewResult.total_correct_label_0} Prediksi Benar</span> | <span className="font-bold text-[#EC4545]">{reviewResult.total_wrong_label_0} Prediksi Salah</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}