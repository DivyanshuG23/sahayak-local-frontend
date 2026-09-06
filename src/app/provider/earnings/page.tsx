"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, ArrowLeft, ShieldCheck, CheckCircle2, ArrowRight } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProviderEarningsPage() {
  const payoutHistory = [
    { id: "tx-1", date: "04 Mar 2026", amount: "₹4,200", status: "Settled", bank: "HDFC Bank (•••• 4192)" },
    { id: "tx-2", date: "25 Feb 2026", amount: "₹12,450", status: "Settled", bank: "HDFC Bank (•••• 4192)" },
    { id: "tx-3", date: "18 Feb 2026", amount: "₹8,900", status: "Settled", bank: "HDFC Bank (•••• 4192)" },
  ];

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/provider/dashboard"
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>Back to Dashboard</span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Earnings & Bank Payouts
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Monitor daily job earnings, instant settlements, and connected bank account.
          </p>
        </div>

        <Button size="sm" variant="emerald" className="font-bold text-xs self-start sm:self-auto shadow-xs">
          <span>Request Payout (₹3,450)</span>
        </Button>
      </div>

      {/* Wallet Balance Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white border-slate-200/80 shadow-2xs p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Available Balance</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">₹3,450</div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Ready for auto-transfer tonight</span>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-2xs p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">This Month's Gross</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">₹68,400</div>
          <span className="text-[11px] text-blue-600 font-bold mt-1 block">+12.4% higher than last month</span>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-2xs p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Lifetime Payouts</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">₹4,82,900</div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">894 completed jobs</span>
        </Card>
      </div>

      {/* Settlement Log */}
      <Card className="bg-white border-slate-200/80 shadow-2xs">
        <CardContent className="p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Recent Bank Transfers</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {payoutHistory.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{p.bank}</div>
                  <div className="text-slate-400 text-[11px]">Date: {p.date} • Reference ID: {p.id}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-slate-900 text-sm">{p.amount}</div>
                  <Badge variant="emerald" className="text-[10px] px-1.5 py-0 font-bold">{p.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
