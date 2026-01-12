const os = require('os');

const args = process.argv.slice(2);

const flags = {
	verbose: args.includes('--verbose'),
	json: args.includes('--json'),
	save: args.includes('--save'),
};

// System Info Collection
const getTotalMemory = () => formatBytes(os.totalmem());

const getUsedMemory = () => {
	const used = os.totalmem() - os.freemem();
	return formatBytes(used);
};

const getSystemInfo = () => ({
	nodeVersion: process.version,
	v8Version: process.versions.v8,
	platform: process.platform,
	architecture: os.arch(),
	osType: os.type(),
	totalMemory: getTotalMemory(),
	freeMemory: formatBytes(os.freemem()),
});

// Process Info Collection
function getProcessInfo() {
	return {
		pid: process.pid,
		ppid: process.ppid,
		cwd: process.cwd(),
		execPath: process.execPath,
		scriptPath: __filename,
		uptime: process.uptime(),
	};
}

const inspector = {
	system: {},
	process: {},
	environment: {},
};

// Environment Info Collection
function getEnvironmentInfo() {
	return {
		nodeEnv: process.env.NODE_ENV || 'not set',
		environmentVariables: flags.verbose
			? process.env
			: { count: Object.keys(process.env).length },
		arguments: process.argv.slice(2),
	};
}

// Format uptime to readable format
function formatUptime(seconds) {
	if (seconds < 60) return `${seconds.toFixed(3)}s`;
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}m ${secs}s`;
}

// Format memory to readable format
function formatBytes(bytes) {
	const mb = bytes / 1024 / 1024;
	return `${mb.toFixed(2)} MB`;
}

// Display report in text format
function displayTextReport(data) {
	console.log('\n╔════════════════════════════════════════╗');
	console.log('║   NODE.JS ENVIRONMENT INSPECTOR        ║');
	console.log('╚════════════════════════════════════════╝\n');

	// System Information
	console.log('📊 SYSTEM INFORMATION');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log(`Node Version:    ${data.system.nodeVersion}`);
	console.log(`V8 Version:      ${data.system.v8Version}`);
	console.log(`Platform:        ${data.system.platform}`);
	console.log(`Architecture:    ${data.system.architecture}`);
	console.log(`OS Type:         ${data.system.osType}`);
	console.log(`Total Memory:    ${data.system.totalMemory}`);
	console.log(`Used Memory:     ${data.system.freeMemory}`);

	// Process Information
	console.log('\n⚙️  PROCESS INFORMATION');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log(`Process ID:      ${data.process.pid}`);
	console.log(`Parent PID:      ${data.process.ppid}`);
	console.log(`Current Dir:     ${data.process.cwd}`);
	console.log(`Exec Path:       ${data.process.execPath}`);
	console.log(`Script Path:     ${data.process.scriptPath}`);
	console.log(`Uptime:          ${formatUptime(data.process.uptime)}`);

	// Environment Information
	console.log('\n🌍 ENVIRONMENT');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log(`NODE_ENV:        ${data.environment.nodeEnv}`);
	console.log(
		`Arguments:       ${data.environment.arguments.join(' ') || 'none'}`,
	);

	if (
		flags.verbose &&
		data.environment.environmentVariables.count === undefined
	) {
		console.log('\nEnvironment Variables:');
		const envVars = data.environment.environmentVariables;
		Object.keys(envVars)
			.slice(0, 10)
			.forEach((key) => {
				const value = envVars[key];
				const displayValue =
					value.length > 50 ? value.substring(0, 47) + '...' : value;
				console.log(`  ${key}: ${displayValue}`);
			});
		if (Object.keys(envVars).length > 10) {
			console.log(`  ... and ${Object.keys(envVars).length - 10} more`);
		}
	} else {
		console.log(
			`Env Var Count:   ${data.environment.environmentVariables.count}`,
		);
	}

	console.log('\n✅ Inspection complete!\n');
}

// Display report in JSON format
function displayJSONReport(data) {
	console.log(JSON.stringify(data, null, 2));
}

// Save report to file
function saveReport(data) {
	const fs = require('fs');
	const path = require('path');

	// Create reports directory if it doesn't exist
	const reportsDir = path.join(__dirname, 'reports');
	if (!fs.existsSync(reportsDir)) {
		fs.mkdirSync(reportsDir);
	}

	// Generate filename with timestamp
	const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
	const filename = path.join(reportsDir, `report-${timestamp}.json`);

	// Write report
	fs.writeFileSync(filename, JSON.stringify(data, null, 2));
	console.log(`\n✅ Report saved to: ${filename}\n`);
}

// Main execution
function main() {
	// Clear terminal for better visibility (optional)
	if (!flags.json) {
		console.clear();
	}

	// Collect data
	inspector.system = getSystemInfo();
	inspector.process = getProcessInfo();
	inspector.environment = getEnvironmentInfo();

	// Display report
	const format = flags.json ? 'json' : 'text';
	if (format === 'json') {
		displayJSONReport(inspector);
	} else {
		displayTextReport(inspector);
	}

	// Save if requested
	if (flags.save) {
		saveReport(inspector);
	}
}

// Run the inspector
main();
