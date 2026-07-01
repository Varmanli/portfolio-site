"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdAddCircleOutline,
  MdArrowBack,
  MdBuild,
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

  const fetchStats = async () => {
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
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const stats = [
    {
      label: "پیام‌ها",
      value: counts.messageCount,
      description: "پیام‌های دریافتی از فرم تماس",
      icon: MdMessage,
      href: "/admin/dashboard/messages",
    },
    {
      label: "خدمات",
      value: counts.serviceCount,
      description: "خدمات قابل نمایش در سایت",
      icon: MdBuild,
      href: "/admin/dashboard/services",
    },
    {
      label: "نمونه‌کارها",
      value: counts.portfolioCount,
      description: "پروژه‌ها و گالری‌های ثبت‌شده",
      icon: MdWork,
      href: "/admin/dashboard/projects",
    },
  ];

  const analyticsStats = [
    {
      label: "بازدید کل",
      value: counts.totalViews,
      description: "مجموع بازدیدهای ثبت‌شده سایت",
      icon: MdVisibility,
    },
    {
      label: "بازدید امروز",
      value: counts.todayViews,
      description: "بازدیدهای ثبت‌شده از ابتدای امروز",
      icon: MdTrendingUp,
    },
    {
      label: "بازدید ۷ روز اخیر",
      value: counts.last7DaysViews,
      description: "مجموع بازدیدهای هفته اخیر",
      icon: MdTrendingUp,
    },
    {
      label: "کاربران تقریبی",
      value: counts.uniqueVisitorsEstimate,
      description: "برآورد بازدیدکنندگان یکتا در ۷ روز اخیر",
      icon: MdVisibility,
    },
  ];

  const quickActions = [
    {
      label: "ویرایش محتوا",
      description: "صفحه اصلی و تماس",
      href: "/admin/dashboard/content",
      icon: MdAddCircleOutline,
    },
    {
      label: "مدیریت خدمات",
      description: "افزودن یا ویرایش خدمات",
      href: "/admin/dashboard/services",
      icon: MdBuild,
    },
    {
      label: "مدیریت نمونه‌کارها",
      description: "افزودن پروژه و گالری",
      href: "/admin/dashboard/projects",
      icon: MdWork,
    },
  ];

  if (isLoading) {
    return <OverviewLoading />;
  }

  return (
    <div className="space-y-6 p-4">
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">
              نمای کلی داشبورد
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              وضعیت کلی پیام‌ها، خدمات و نمونه‌کارهای ثبت‌شده را اینجا ببینید.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchStats}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700"
          >
            <MdRefresh size={18} />
            بروزرسانی
          </button>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/60 p-5 transition hover:-translate-y-0.5 hover:border-yellow-200 hover:bg-yellow-50/50 hover:shadow-md"
              >
                <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-yellow-100/60 blur-2xl transition group-hover:bg-yellow-200/80" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-500">
                      {item.label}
                    </p>

                    <p className="mt-3 text-4xl font-black tracking-tight text-gray-900">
                      {item.value.toLocaleString("fa-IR")}
                    </p>

                    <p className="mt-3 text-xs leading-6 text-gray-500">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-500 text-white shadow-sm shadow-yellow-200 transition group-hover:scale-105">
                    <Icon size={23} />
                  </div>
                </div>

                <div className="relative mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-bold text-yellow-700">
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

      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-lg font-black text-gray-900">آمار بازدید</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            بازدید سایت به‌صورت خصوصی و درون‌سازمانی رصد می‌شود.
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {analyticsStats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/60 p-5 transition hover:border-yellow-200 hover:bg-yellow-50/50"
              >
                <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-yellow-100/60 blur-2xl transition group-hover:bg-yellow-200/80" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-500">
                      {item.label}
                    </p>

                    <p className="mt-3 text-3xl font-black tracking-tight text-gray-900">
                      {item.value.toLocaleString("fa-IR")}
                    </p>

                    <p className="mt-3 text-xs leading-6 text-gray-500">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-500 text-white shadow-sm shadow-yellow-200">
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {counts.topPages.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5">
            <h3 className="text-sm font-black text-gray-900">
              پربازدیدترین صفحات
            </h3>

            <div className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
              {counts.topPages.map((page) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between gap-4 bg-gray-50/60 px-4 py-3 text-sm"
                >
                  <span className="truncate font-medium text-gray-700" dir="ltr">
                    {page.path}
                  </span>
                  <span className="shrink-0 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                    {page.views.toLocaleString("fa-IR")} بازدید
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-lg font-black text-gray-900">میانبر سریع</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            دسترسی سریع به بخش‌هایی که بیشتر استفاده می‌شوند.
          </p>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center justify-between gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-4 transition hover:border-yellow-200 hover:bg-yellow-50/60 hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700 transition group-hover:bg-yellow-500 group-hover:text-white">
                    <Icon size={22} />
                  </span>

                  <span>
                    <span className="block text-sm font-black text-gray-900">
                      {action.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-gray-500">
                      {action.description}
                    </span>
                  </span>
                </div>

                <MdArrowBack
                  size={20}
                  className="text-gray-300 transition group-hover:-translate-x-1 group-hover:text-yellow-600"
                />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
