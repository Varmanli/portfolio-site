"use client";

import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  MdAddCircleOutline,
  MdArrowBack,
  MdBuild,
  MdDashboard,
  MdMessage,
  MdRefresh,
  MdTrendingUp,
  MdVisibility,
  MdWork,
} from "react-icons/md";

import { showError } from "@/lib/utils/toast";
import OverviewLoading from "./loading";

type TopPage = { path: string; views: number };

type StatsState = {
  messageCount: number;
  serviceCount: number;
  portfolioCount: number;
  totalViews: number;
  todayViews: number;
  last7DaysViews: number;
  uniqueVisitorsEstimate: number;
  topPages: TopPage[];
};

const INITIAL_STATS: StatsState = {
  messageCount: 0,
  serviceCount: 0,
  portfolioCount: 0,
  totalViews: 0,
  todayViews: 0,
  last7DaysViews: 0,
  uniqueVisitorsEstimate: 0,
  topPages: [],
};

export default function OverviewPage() {
  const [counts, setCounts] = useState<StatsState>(INITIAL_STATS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get<StatsState>("/api/stats");

      setCounts({
        messageCount: data.messageCount ?? 0,
        serviceCount: data.serviceCount ?? 0,
        portfolioCount: data.portfolioCount ?? 0,
        totalViews: data.totalViews ?? 0,
        todayViews: data.todayViews ?? 0,
        last7DaysViews: data.last7DaysViews ?? 0,
        uniqueVisitorsEstimate: data.uniqueVisitorsEstimate ?? 0,
        topPages: data.topPages ?? [],
      });
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const stats = [
    {
      label: "پیام‌ها",
      value: counts.messageCount,
      description: "پیام‌های دریافتی از فرم تماس",
      icon: MdMessage,
      href: "/admin/dashboard/messages",
      bg: "bg-[#FFE066]",
    },
    {
      label: "خدمات",
      value: counts.serviceCount,
      description: "خدمات قابل نمایش در سایت",
      icon: MdBuild,
      href: "/admin/dashboard/services",
      bg: "bg-[#CAF3AB]",
    },
    {
      label: "نمونه‌کارها",
      value: counts.portfolioCount,
      description: "پروژه‌ها و گالری‌های ثبت‌شده",
      icon: MdWork,
      href: "/admin/dashboard/projects",
      bg: "bg-[#F196E5]",
    },
  ];

  const analyticsStats = [
    {
      label: "بازدید کل",
      value: counts.totalViews,
      description: "مجموع بازدیدهای ثبت‌شده سایت",
      icon: MdVisibility,
      bg: "bg-[#FFE066]",
    },
    {
      label: "بازدید امروز",
      value: counts.todayViews,
      description: "بازدیدهای ثبت‌شده از ابتدای امروز",
      icon: MdTrendingUp,
      bg: "bg-[#CAF3AB]",
    },
    {
      label: "بازدید ۷ روز اخیر",
      value: counts.last7DaysViews,
      description: "مجموع بازدیدهای هفته اخیر",
      icon: MdTrendingUp,
      bg: "bg-sky-200",
    },
    {
      label: "کاربران تقریبی",
      value: counts.uniqueVisitorsEstimate,
      description: "برآورد بازدیدکنندگان یکتا در ۷ روز اخیر",
      icon: MdVisibility,
      bg: "bg-[#F196E5]",
    },
  ];

  const quickActions = [
    {
      label: "ویرایش محتوا",
      description: "صفحه اصلی و تماس",
      href: "/admin/dashboard/content",
      icon: MdAddCircleOutline,
      bg: "bg-[#FFE066]",
    },
    {
      label: "مدیریت خدمات",
      description: "افزودن یا ویرایش خدمات",
      href: "/admin/dashboard/services",
      icon: MdBuild,
      bg: "bg-[#CAF3AB]",
    },
    {
      label: "مدیریت نمونه‌کارها",
      description: "افزودن پروژه و گالری",
      href: "/admin/dashboard/projects",
      icon: MdWork,
      bg: "bg-[#F196E5]",
    },
  ];

  if (isLoading) {
    return <OverviewLoading />;
  }

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#FFFDF5] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute right-10 top-10 h-52 w-52 rounded-full bg-[#F196E5]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-10 h-64 w-64 rounded-full bg-[#CAF3AB]/50 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]">
          <div className="flex flex-col gap-5 border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
                <MdDashboard size={28} />
              </span>

              <div>
                <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                  مدیریت سایت
                </div>

                <h1 className="text-xl font-black leading-9 text-black sm:text-2xl">
                  نمای کلی داشبورد
                </h1>

                <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                  وضعیت کلی پیام‌ها، خدمات، نمونه‌کارها و بازدیدهای سایت را
                  اینجا ببینید.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={fetchStats}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-white px-4 py-2.5 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#111]"
            >
              <MdRefresh
                size={18}
                className={isLoading ? "animate-spin" : ""}
              />
              بروزرسانی
            </button>
          </div>

          <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-3">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative overflow-hidden rounded-[1.75rem] border-2 border-black bg-white p-5 shadow-[6px_6px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111]"
                >
                  <div
                    className={`absolute -left-8 -top-8 h-24 w-24 rounded-full ${item.bg} opacity-55 blur-2xl transition group-hover:opacity-80`}
                  />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-black/55">
                        {item.label}
                      </p>

                      <p className="mt-3 text-4xl font-black tracking-tight text-black">
                        {item.value.toLocaleString("fa-IR")}
                      </p>

                      <p className="mt-3 text-xs font-bold leading-6 text-black/50">
                        {item.description}
                      </p>
                    </div>

                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black ${item.bg} text-black shadow-[4px_4px_0_#111] transition group-hover:-translate-x-0.5 group-hover:-translate-y-0.5`}
                    >
                      <Icon size={26} />
                    </span>
                  </div>

                  <div className="relative z-10 mt-5 flex items-center justify-between border-t-2 border-black/10 pt-4 text-xs font-black text-black">
                    <span>مشاهده جزئیات</span>
                    <MdArrowBack
                      size={18}
                      className="transition group-hover:-translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]">
          <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:px-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#CAF3AB] text-black shadow-[4px_4px_0_#111]">
                <MdVisibility size={25} />
              </span>

              <div>
                <h2 className="text-lg font-black text-black">آمار بازدید</h2>
                <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                  بازدید سایت به‌صورت خصوصی و درون‌سازمانی رصد می‌شود.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-4 sm:p-6 sm:grid-cols-2 lg:grid-cols-4">
            {analyticsStats.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="group relative overflow-hidden rounded-[1.75rem] border-2 border-black bg-white p-5 shadow-[6px_6px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111]"
                >
                  <div
                    className={`absolute -left-8 -top-8 h-24 w-24 rounded-full ${item.bg} opacity-50 blur-2xl transition group-hover:opacity-80`}
                  />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-black/55">
                        {item.label}
                      </p>

                      <p className="mt-3 text-3xl font-black tracking-tight text-black">
                        {item.value.toLocaleString("fa-IR")}
                      </p>

                      <p className="mt-3 text-xs font-bold leading-6 text-black/50">
                        {item.description}
                      </p>
                    </div>

                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black ${item.bg} text-black shadow-[3px_3px_0_#111]`}
                    >
                      <Icon size={22} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {counts.topPages.length > 0 && (
            <div className="border-t-2 border-black/10 px-4 py-5 sm:px-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-black">
                    پربازدیدترین صفحات
                  </h3>
                  <p className="mt-1 text-xs font-bold text-black/45">
                    مسیرهایی که بیشترین بازدید را داشته‌اند.
                  </p>
                </div>

                <span className="shrink-0 rounded-full border-2 border-black bg-[#F196E5] px-4 py-2 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                  {counts.topPages.length.toLocaleString("fa-IR")} صفحه
                </span>
              </div>

              <div className="space-y-3">
                {counts.topPages.map((page, index) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between gap-4 rounded-2xl border-2 border-black bg-white px-4 py-3 text-sm shadow-[4px_4px_0_#111]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-[#FFE066] text-xs font-black text-black shadow-[2px_2px_0_#111]">
                        {(index + 1).toLocaleString("fa-IR", {
                          minimumIntegerDigits: 2,
                        })}
                      </span>

                      <span
                        className="truncate font-black text-black"
                        dir="ltr"
                      >
                        {page.path}
                      </span>
                    </div>

                    <span className="shrink-0 rounded-full border-2 border-black bg-[#CAF3AB] px-3 py-1 text-xs font-black text-black shadow-[2px_2px_0_#111]">
                      {page.views.toLocaleString("fa-IR")} بازدید
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]">
          <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:px-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
                <MdAddCircleOutline size={25} />
              </span>

              <div>
                <h2 className="text-lg font-black text-black">میانبر سریع</h2>
                <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                  دسترسی سریع به بخش‌هایی که بیشتر استفاده می‌شوند.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center justify-between gap-4 rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111]"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black ${action.bg} text-black shadow-[3px_3px_0_#111] transition group-hover:bg-[#FFE066]`}
                    >
                      <Icon size={23} />
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black text-black">
                        {action.label}
                      </span>
                      <span className="mt-1 block truncate text-xs font-bold leading-5 text-black/50">
                        {action.description}
                      </span>
                    </span>
                  </div>

                  <MdArrowBack
                    size={20}
                    className="shrink-0 text-black/45 transition group-hover:-translate-x-1 group-hover:text-black"
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
