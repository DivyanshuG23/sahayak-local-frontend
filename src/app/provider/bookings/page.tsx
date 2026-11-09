"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  AlertCircle,
  Plus,
  ShieldCheck,
  Check,
  X,
  CreditCard,
  FileText,
} from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useProvider } from "@/components/provider/layout/ProviderShell";
import {
  useGetProviderBookingRequestsQuery,
  useAcceptBookingMutation,
  useRejectBookingMutation,
  useUpdateBookingStatusMutation,
  useVerifyBookingOtpMutation,
} from "@/services/booking.service";
import {
  useAddBookingChargesMutation,
  useConfirmPaymentMutation,
} from "@/services/payment.service";
import { getApiErrorMessage } from "@/lib/errorUtils";
import { cn } from "@/lib/utils";

export default function ProviderBookingsPage() {
  const { showToast } = useProvider();
  const [activeTab, setActiveTab] = useState<"all" | "requested" | "active" | "completed">("all");

  // Live Backend Bookings Query
  const {
    data: bookingsData,
    isLoading,
    refetch,
  } = useGetProviderBookingRequestsQuery(undefined);

  // Mutations
  const [acceptBookingApi, { isLoading: isAccepting }] = useAcceptBookingMutation();
  const [rejectBookingApi, { isLoading: isRejecting }] = useRejectBookingMutation();
  const [updateStatusApi, { isLoading: isUpdatingStatus }] = useUpdateBookingStatusMutation();
  const [verifyOtpApi, { isLoading: isVerifyingOtp }] = useVerifyBookingOtpMutation();
  const [addChargesApi, { isLoading: isAddingCharges }] = useAddBookingChargesMutation();
  const [confirmPaymentApi, { isLoading: isConfirmingPayment }] = useConfirmPaymentMutation();

  // Modals state
  const [selectedBookingForOtp, setSelectedBookingForOtp] = useState<any | null>(null);
  const [otpInput, setOtpInput] = useState<string>("");
  const [selectedBookingForCharges, setSelectedBookingForCharges] = useState<any | null>(null);
  const [chargeTitle, setChargeTitle] = useState<string>("");
  const [chargeAmount, setChargeAmount] = useState<string>("");
  const [rejectingBookingId, setRejectingBookingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState<string>("");

  // Map Backend Bookings list
  const rawList = bookingsData?.data?.bookings || bookingsData?.data || [];
  const bookings: any[] = useMemo(() => {
    if (Array.isArray(rawList)) {
      return rawList;
    }
    return [];
  }, [rawList]);

  // Tab Filtering
  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const status = (b.status || "PENDING").toUpperCase();
      if (activeTab === "requested") return status === "PENDING";
      if (activeTab === "active")
        return ["CONFIRMED", "ON_THE_WAY", "IN_PROGRESS"].includes(status);
      if (activeTab === "completed") return status === "COMPLETED";
      return true;
    });
  }, [bookings, activeTab]);

  const counts = useMemo(() => {
    return {
      all: bookings.length,
      requested: bookings.filter((b) => (b.status || "PENDING").toUpperCase() === "PENDING").length,
      active: bookings.filter((b) =>
        ["CONFIRMED", "ON_THE_WAY", "IN_PROGRESS"].includes((b.status || "").toUpperCase())
      ).length,
      completed: bookings.filter((b) => (b.status || "").toUpperCase() === "COMPLETED").length,
    };
  }, [bookings]);

  // Handlers
  const handleAccept = async (id: string) => {
    try {
      await acceptBookingApi(id).unwrap();
      showToast("Booking request accepted! Customer scheduled.");
      refetch();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to accept booking."));
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectingBookingId) return;
    try {
      await rejectBookingApi({
        id: rejectingBookingId,
        reason: rejectReason || "Provider currently unavailable",
      }).unwrap();
      showToast("Booking request declined.");
      setRejectingBookingId(null);
      setRejectReason("");
      refetch();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to decline booking."));
    }
  };

  const handleUpdateStatus = async (id: string, nextStatus: string) => {
    try {
      await updateStatusApi({ id, status: nextStatus }).unwrap();
      showToast(`Status updated to ${nextStatus.replace(/_/g, " ")}`);
      refetch();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to update status."));
    }
  };

  const handleVerifyOtp = async () => {
    if (!selectedBookingForOtp || !otpInput.trim()) return;
    try {
      await verifyOtpApi({
        id: selectedBookingForOtp._id || selectedBookingForOtp.id,
        otp: otpInput.trim(),
      }).unwrap();
      showToast("OTP Verified! Job marked as Completed.");
      setSelectedBookingForOtp(null);
      setOtpInput("");
      refetch();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Invalid OTP. Please check customer phone."));
    }
  };

  const handleAddCharges = async () => {
    if (!selectedBookingForCharges || !chargeTitle.trim() || !chargeAmount) return;
    const amount = Number(chargeAmount);
    if (isNaN(amount) || amount <= 0) {
      showToast("Please enter a valid charge amount.");
      return;
    }

    try {
      await addChargesApi({
        bookingId: selectedBookingForCharges._id || selectedBookingForCharges.id,
        title: chargeTitle.trim(),
        amount,
      }).unwrap();
      showToast(`Added charge "${chargeTitle.trim()}" (₹${amount}) to bill!`);
      setSelectedBookingForCharges(null);
      setChargeTitle("");
      setChargeAmount("");
      refetch();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to add charge to booking bill."));
    }
  };

  const handleConfirmPayment = async (id: string, totalAmount: number) => {
    try {
      await confirmPaymentApi({
        bookingId: id,
        paymentMethod: "CASH",
        amountReceived: totalAmount,
      }).unwrap();
      showToast("Payment confirmed received! Transaction closed.");
      refetch();
    } catch (err: any) {
      showToast(getApiErrorMessage(err, "Failed to record payment."));
    }
  };

  const getStatusBadge = (rawStatus: string) => {
    const status = (rawStatus || "PENDING").toUpperCase();
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="destructive" className="text-[10px] sm:text-xs font-bold px-2 py-0.5">
            Pending Acceptance
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge variant="blue" className="text-[10px] sm:text-xs font-bold px-2 py-0.5">
            Confirmed Visit
          </Badge>
        );
      case "ON_THE_WAY":
        return (
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 text-[10px] sm:text-xs font-bold px-2 py-0.5">
            On The Way
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] sm:text-xs font-bold px-2 py-0.5">
            Work In Progress
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge variant="emerald" className="text-[10px] sm:text-xs font-bold px-2 py-0.5">
            Completed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge variant="outline" className="text-[10px] sm:text-xs font-bold px-2 py-0.5 text-slate-400">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-[10px] sm:text-xs font-bold px-2 py-0.5">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <Link href="/provider/dashboard" className="inline-block">
            <Button
              variant="ghost"
              size="xs"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 gap-1 px-1 -ml-1 h-6 cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 sm:mt-1">
            Bookings & Lead Management
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Review customer job requests, manage visits, and verify OTP on job completion.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-x-auto max-w-full shrink-0">
          {[
            { id: "all", label: `All (${counts.all})` },
            { id: "requested", label: `New Requests (${counts.requested})` },
            { id: "active", label: `Active (${counts.active})` },
            { id: "completed", label: `Done (${counts.completed})` },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "secondary" : "ghost"}
              size="xs"
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "h-7 px-2.5 sm:px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer",
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100/80"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 bg-white border border-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Bookings List */}
      {!isLoading && (
        <div className="space-y-2.5 sm:space-y-3">
          {filtered.length === 0 ? (
            <Card className="bg-white border-slate-200/80 shadow-2xs py-0 rounded-xl">
              <CardContent className="p-12 text-center text-xs text-slate-400 space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Clock size={20} />
                </div>
                <p className="font-semibold text-slate-600">No booking requests found in this tab.</p>
                <p className="text-[11px] text-slate-400">Incoming bookings from customers will appear here automatically.</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((b) => {
              const status = (b.status || "PENDING").toUpperCase();
              const customerName =
                b.addressSnapshot?.contactPersonName ||
                b.customerId?.fullName ||
                b.userId?.fullName ||
                "Customer";
              const customerPhone =
                b.addressSnapshot?.contactPhone ||
                b.customerId?.phone ||
                b.userId?.phone ||
                "";
              const serviceName =
                b.serviceSnapshot?.name || b.serviceId?.name || "Doorstep Service";
              const bookingRef = b.bookingId || b._id?.slice(-8) || "SL-JOB";
              const scheduledDate = b.bookingDate
                ? new Date(b.bookingDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Today";
              const scheduledTime = b.timeSlot || "Standard Hours";
              const locality =
                b.addressSnapshot?.locality ||
                b.addressSnapshot?.city ||
                "Local Area";
              const fullAddress = b.addressSnapshot
                ? `${b.addressSnapshot.houseFlatNo || ""}, ${b.addressSnapshot.street || ""}, ${b.addressSnapshot.city || ""}`.replace(/^,\s*/, "")
                : locality;
              const totalAmount = b.totalAmount || b.pricing?.finalTotal || 399;
              const paymentMode = b.paymentMethod || "Pay after service";

              const customerInitials = customerName
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              return (
                <Card
                  key={b._id || b.id}
                  className="bg-white border-slate-200/80 shadow-2xs hover:border-blue-300/80 transition-colors py-0 rounded-xl sm:rounded-2xl"
                >
                  <CardContent className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <Avatar className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ring-1 ring-slate-200 shrink-0">
                        <AvatarImage
                          src={b.customerId?.avatar || b.userId?.avatar}
                          alt={customerName}
                          className="rounded-xl sm:rounded-2xl"
                        />
                        <AvatarFallback className="rounded-xl sm:rounded-2xl bg-blue-50 text-blue-700 font-bold text-xs sm:text-sm">
                          {customerInitials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {customerName}
                          </span>
                          {getStatusBadge(status)}
                          <span className="text-[10px] text-slate-400 font-mono hidden xs:inline">
                            Ref: #{bookingRef}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-slate-700 truncate">
                          {serviceName}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock size={11} className="text-slate-400 shrink-0" />
                            <span>
                              {scheduledDate}, {scheduledTime}
                            </span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1" title={fullAddress}>
                            <MapPin size={11} className="text-slate-400 shrink-0" />
                            <span className="truncate max-w-[200px]">{fullAddress}</span>
                          </span>
                          {customerPhone && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-slate-600 font-medium">
                                <Phone size={11} className="text-emerald-500 shrink-0" />
                                <span>{customerPhone}</span>
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-100 gap-2 shrink-0">
                      <div className="text-left sm:text-right">
                        <div className="text-sm sm:text-base font-black text-slate-900">
                          ₹{totalAmount}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium capitalize">
                          {paymentMode}
                        </div>
                      </div>

                      {/* Dynamic Action Buttons per Booking Status */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {status === "PENDING" && (
                          <>
                            <Button
                              size="sm"
                              variant="emerald"
                              disabled={isAccepting}
                              onClick={() => handleAccept(b._id)}
                              className="text-xs font-bold px-3 h-8 cursor-pointer"
                            >
                              Accept Lead
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setRejectingBookingId(b._id);
                                setRejectReason("");
                              }}
                              className="text-xs font-semibold px-2.5 text-rose-600 border-rose-200 hover:bg-rose-50 h-8 cursor-pointer"
                            >
                              Decline
                            </Button>
                          </>
                        )}

                        {status === "CONFIRMED" && (
                          <Button
                            size="sm"
                            variant="default"
                            disabled={isUpdatingStatus}
                            onClick={() => handleUpdateStatus(b._id, "ON_THE_WAY")}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3 h-8 cursor-pointer"
                          >
                            Mark On The Way
                          </Button>
                        )}

                        {status === "ON_THE_WAY" && (
                          <Button
                            size="sm"
                            variant="default"
                            disabled={isUpdatingStatus}
                            onClick={() => handleUpdateStatus(b._id, "IN_PROGRESS")}
                            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 h-8 cursor-pointer"
                          >
                            Start Job
                          </Button>
                        )}

                        {status === "IN_PROGRESS" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedBookingForCharges(b);
                                setChargeTitle("");
                                setChargeAmount("");
                              }}
                              className="text-xs font-semibold px-2.5 text-blue-600 border-blue-200 hover:bg-blue-50 h-8 cursor-pointer"
                            >
                              + Spare Part
                            </Button>
                            <Button
                              size="sm"
                              variant="emerald"
                              onClick={() => {
                                setSelectedBookingForOtp(b);
                                setOtpInput("");
                              }}
                              className="text-xs font-bold px-3 h-8 cursor-pointer"
                            >
                              Verify OTP & Finish
                            </Button>
                          </>
                        )}

                        {status === "COMPLETED" && (
                          <div className="flex items-center gap-1.5">
                            {b.paymentStatus !== "PAID" && (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isConfirmingPayment}
                                onClick={() => handleConfirmPayment(b._id, totalAmount)}
                                className="text-xs font-semibold px-2.5 text-emerald-700 border-emerald-300 hover:bg-emerald-50 h-8 cursor-pointer"
                              >
                                Confirm Paid
                              </Button>
                            )}
                            <Link href={`/payments/booking/${b._id}/bill`} target="_blank">
                              <Button size="sm" variant="outline" className="text-xs font-semibold px-2.5 h-8">
                                <FileText size={12} />
                                <span>Bill</span>
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* OTP Verification Modal Dialog */}
      {selectedBookingForOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Verify Customer OTP</h3>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setSelectedBookingForOtp(null)}
                className="rounded-full"
              >
                <X size={16} />
              </Button>
            </div>
            <p className="text-xs text-slate-500">
              Ask customer for the 4-digit or 6-digit job completion OTP displayed on their screen.
            </p>
            <input
              type="text"
              maxLength={6}
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Enter OTP (e.g. 1234)"
              className="w-full text-center text-xl font-mono tracking-widest p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setSelectedBookingForOtp(null)}
                className="flex-1 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                variant="emerald"
                disabled={isVerifyingOtp || !otpInput.trim()}
                onClick={handleVerifyOtp}
                className="flex-1 text-xs font-bold"
              >
                {isVerifyingOtp ? "Verifying..." : "Verify & Complete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Extra Charges Modal Dialog */}
      {selectedBookingForCharges && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Add Spare Part / Extra Charge</h3>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setSelectedBookingForCharges(null)}
                className="rounded-full"
              >
                <X size={16} />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                  Item / Part Name *
                </label>
                <input
                  type="text"
                  value={chargeTitle}
                  onChange={(e) => setChargeTitle(e.target.value)}
                  placeholder="e.g. Copper Pipe replacement (2m)"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  value={chargeAmount}
                  onChange={(e) => setChargeAmount(e.target.value)}
                  placeholder="e.g. 450"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setSelectedBookingForCharges(null)}
                className="flex-1 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                disabled={isAddingCharges || !chargeTitle.trim() || !chargeAmount}
                onClick={handleAddCharges}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
              >
                {isAddingCharges ? "Adding..." : "Add to Bill"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Booking Reason Modal Dialog */}
      {rejectingBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Decline Booking Request</h3>
            <p className="text-xs text-slate-500">
              Provide a brief reason to notify the customer why you cannot take this job.
            </p>
            <input
              type="text"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Fully booked today or out of coverage"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
            />
            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setRejectingBookingId(null)}
                className="flex-1 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={isRejecting}
                onClick={handleConfirmReject}
                className="flex-1 text-xs font-bold"
              >
                {isRejecting ? "Declining..." : "Confirm Decline"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
