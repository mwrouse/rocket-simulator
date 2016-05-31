#make sure to add
#    powershell.exe -File $(ProjectDir)Generate_dts.ps1
# to your pono dll's post build step

#script working directory
$pwd = split-path -parent $MyInvocation.MyCommand.Definition
$rootDir = (get-item $pwd )

#parameters
$inputDLL = "RocketSimulator.Models.Body.dll"

$outFileDir = "\RocketSimulator.Web\scripts\src\domain\"
$outFileName = "RocketSimulator.Models.Body.d.ts"


[Environment]::CurrentDirectory = $pwd
$dirDll = ([System.IO.Path]::Combine($pwd, "bin\debug"))
if (![System.IO.Directory]::Exists($dirDll)) {
    $dirDll = [System.IO.Path]::Combine($pwd, "..\..\bin\debug")
    if (![System.IO.Directory]::Exists($dirDll)) {
        throw "Cannot find $dirDll"
    }
}
$dirDll = [System.IO.Path]::Combine($dirDll, $inputDLL)

$filePath = ([System.IO.Path]::Combine($pwd, $outFileName))
$cg = [System.IO.Path]::Combine($pwd, "..\packages\TS.CodeGenerator.1.0.0.17\tools\TS.CodeGenerator.dll");
$libPath = ([System.IO.Path]::GetFullPath($cg));


Write-Host ""
Write-Host "Loading Generator " $libPath
Write-Host ""
[Reflection.Assembly]::LoadFile($libPath)

Write-Host ""
Write-Host "Creating d.ts file from assembly: " $dirDll
Write-Host ""
$assemblyReader = new-object -Typename TS.CodeGenerator.AssemblyReader -ArgumentList $dirDll
#or do this
#$asm= [Reflection.Assembly]::LoadFile($dirDll)
#$assemblyReader = new-object -Typename TS.CodeGenerator.NamespaceAssemblyReader -ArgumentList $asm

#set parameters here
$outStream = $assemblyReader.GenerateTypingsStream()

If (Test-Path $filePath){
	Remove-Item $filePath
}

$fs = New-Object IO.FileStream $filePath ,'Append' 
$sw = New-Object IO.StreamWriter -ArgumentList  $fs
#add addtional lines to script
#$sw.WriteLine('/// <reference path="../jquery/jquery.d.ts" />');
$sw.Flush();
$outStream.WriteTo($fs);
$fs.Flush();
$fs.Close();
$outStream.Close();

# Do not let $outFileDir be ""
if ($outFileDir -eq "")
{
	$outFileDir = ".";
}

# Do not let $outFileDir begin with "\"
if ($outFileDir.Substring(0, 1) -eq "\")
{
	$outFileDir = $outFileDir.Substring(1); # Removes leading slash
	
	# Needed incase $outFileDir was only a slash 
	if($outFileDir -eq "") { $outFileDir = "."; }
}

# Do not let $outFileDir end with a "\"
if ($outFileDir.Substring($outFileDir.Length - 1) -eq "\")
{
	$outFileDir = $outFileDir.Substring(0, $outFileDir.Length - 1); # Trim trailing slash 
	
	# Needed incase $outFileDir was only a slash 
	if ($outFileDir -eq "") { $outFileDir = "."; }
}


#Copy to as many places as you like
$outPath = $rootDir.parent.FullName + "\" + $outFileDir + "\" + $outFileName ;
Write-Host ""
Write-Host "Copying generated dts: " + $outPath 
Write-Host ""
copy-item  -Force $filePath $outPath

write-host "Created DTS"
write-host (gc $filePath)
write-host "cleaning up"

#cleanup
If (Test-Path $filePath){
	Remove-Item $filePath
}

exit $lastexitcode