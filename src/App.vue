<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md hidden md:block">
      <div class="h-16 flex items-center justify-center text-2xl font-bold text-blue-600">LOGO</div>
      <nav class="mt-4">
        <ul>
          <li class="px-6 py-3 hover:bg-blue-100 cursor-pointer">Dashboard</li>
          <li class="px-6 py-3 hover:bg-blue-100 cursor-pointer">Users</li>
          <li class="px-6 py-3 hover:bg-blue-100 cursor-pointer">Settings</li>
        </ul>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar -->
      <header class="h-16 bg-white shadow-md flex items-center px-6">
        <h1 class="text-xl font-semibold">Dashboard</h1>
        <div class="ml-auto flex items-center space-x-4">
          <button class="text-gray-600 hover:text-blue-600">🔔</button>
          <img
            src="https://i.pravatar.cc/40"
            alt="Avatar"
            class="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold mb-2">Users</h2>
            <p class="text-gray-500">Manage all users in the system.</p>
          </div>
          <!-- Card 2 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold mb-2">Revenue</h2>
            <p class="text-gray-500">Check latest revenue reports.</p>
          </div>
          <!-- Card 3 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold mb-2">Settings</h2>
            <p class="text-gray-500">Adjust system preferences.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// 目前这里不需要额外逻辑
</script>

<style scoped>
/* 可以在这里加一些动画或细节优化 */
</style>
