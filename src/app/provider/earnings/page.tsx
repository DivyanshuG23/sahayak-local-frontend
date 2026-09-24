"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, ArrowLeft, ShieldCheck, CheckCircle2, ArrowRight } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProviderEarningsPage() {
  const payoutHistory = [
    { id: "tx-1", date: "04 Mar 2026", amount: "₹4,200", status: "Settled", bank: "HDFC Bank (•••• 4192)" },
    { id: "tx-2", date: "25 Feb 2026", amount: "₹12,450", status: "Settled", bank: "HDFC Bank (•••• 4192)" },
    { id: "tx-3", date: "18 Feb 2026", amount: "₹8,900", status: "Settled", bank: "HDFC Bank (•••• 4192)" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <Link href="/provider/dashboard" className="inline-block">
            <Button
              variant="ghost"
              size="xs"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 gap-1 px-1 -ml-1 h-6"
            >
              <ArrowLeft size={13} />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 sm:mt-1">
            Earnings & Bank Payouts
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Monitor daily job earnings, instant settlements, and connected bank account.
          </p>
        </div>

        <Button size="sm" variant="emerald" className="font-bold text-xs self-start sm:self-auto shadow-xs h-8 sm:h-9 w-full sm:w-auto justify-center">
          <span>Request Payout (₹3,450)</span>
        </Button>
      </div>

      {/* Wallet Balance Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-xl sm:rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Available Balance
            </span>
            <div className="text-xl sm:text-3xl font-black text-slate-900 mt-1">₹3,450</div>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
              Ready for auto-transfer tonight
            </span>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-xl sm:rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              This Month's Gross
            </span>
            <div className="text-xl sm:text-3xl font-black text-slate-900 mt-1">₹68,400</div>
            <span className="text-[11px] text-blue-600 font-bold mt-1 block">
              +12.4% higher than last month
            </span>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-xl sm:rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Lifetime Payouts
            </span>
            <div className="text-xl sm:text-3xl font-black text-slate-900 mt-1">₹4,82,900</div>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              894 completed jobs
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Settlement Log */}
      <Card className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-xl sm:rounded-2xl">
        <CardHeader className="p-4 sm:p-5 pb-2 border-b border-slate-100">
          <CardTitle className="text-xs sm:text-sm font-bold text-slate-900">
            Recent Bank Transfers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 space-y-1">
          <div className="divide-y divide-slate-100 text-xs">
            {payoutHistory.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">{p.bank}</div>
                  <div className="text-slate-400 text-[10px] sm:text-[11px] truncate">
                    Date: {p.date} • Ref: {p.id}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-slate-900 text-xs sm:text-sm">{p.amount}</div>
                  <Badge variant="emerald" className="text-[9px] sm:text-[10px] px-1.5 py-0 font-bold">
                    {p.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
